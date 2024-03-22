import { render } from '@testing-library/vue';
import userEvent from '@testing-library/user-event';

import GameCompo from './GameCompo.vue';
import type { Props } from './GameCompo.vue';

import { easyGameConfig } from '@/__mocks__/gameConfigs';

const mockedCallback = vi.fn();

const setup = (props: Partial<Props> = { configuration: easyGameConfig, onSolved: mockedCallback }) => ({
  user: userEvent.setup(),
  ...render(GameCompo, { props }),
});

describe('GameCompo', () => {
  afterEach(() => {
    vi.clearAllMocks();
    vi.resetAllMocks();
  });

  it('should render the game board', () => {
    const { queryByText } = setup();

    easyGameConfig.forEach((value) => {
      if (value === 0) return;
      expect(queryByText(value.toString())).toBeInTheDocument();
    });
  });

  it('should call onSolved when the game is solved', async () => {
    const { user, getByText } = setup();

    const cellToMove = getByText('15');

    await user.click(cellToMove);

    expect(mockedCallback).toHaveBeenCalled();
  });

  it('should not call onSolved when the game is not solved', async () => {
    const { user, getByText } = setup();

    const cellToMove = getByText('14');

    await user.click(cellToMove);

    expect(mockedCallback).not.toHaveBeenCalled();
  });
});
