import { defineComponent } from 'vue';
import { render } from '@testing-library/vue';
import userEvent from '@testing-library/user-event';

import App from './App.vue';

const mockedConfetti = vi.fn();

vi.mock('js-confetti', () => ({
  __esModule: true,
  default: vi.fn().mockImplementation(() => ({
    addConfetti: () => mockedConfetti(),
  })),
}));

const setup = () => ({
  user: userEvent.setup(),
  ...render(App, {
    global: {
      stubs: {
        GameCompo: defineComponent({
          props: ['configuration', 'onSolved'],
          template: '<button @click="$props.onSolved()">GameCompo</button>',
        }),
      },
    },
  }),
});

describe('App', () => {
  afterEach(() => {
    vi.clearAllMocks();
    vi.resetAllMocks();
  });

  it('should render the game', () => {
    const { queryByText } = setup();

    expect(queryByText('GameCompo')).toBeInTheDocument();
  });

  it('should call celebrate when the game is solved', async () => {
    const { user, getByText } = setup();

    await user.click(getByText('GameCompo'));

    expect(mockedConfetti).toHaveBeenCalled();
  });
});
