import { twMerge } from 'tailwind-merge';

import { Font } from '@/lib';

import { CheckBoxSelect, CircleUnselect, RadioSelect } from '../../icons';
import { Radio } from './checkbox';

type OptionSelectionType = 'check' | 'radio';

type Props = {
  type: OptionSelectionType;
  option: string;
  isSelected: boolean;
  onSelect: () => void;
};

const SelectUnselectOptionButton: React.FC<Props> = ({
  type,
  option,
  isSelected,
  onSelect,
}) => {
  return (
    <Radio.Root
      key={option}
      checked={isSelected}
      onChange={() => onSelect()}
      accessibilityLabel="radio button"
      className={twMerge(
        'border-2 border- gap-6 rounded-md  p-4',
        isSelected ? 'border-[#6B4AEA]' : 'border-[#ccc]'
      )}
    >
      {!isSelected && <CircleUnselect />}
      {isSelected && (type === 'radio' ? <RadioSelect /> : <CheckBoxSelect />)}
      <Radio.Label
        text={option}
        className={twMerge('text-lg')}
        font={
          isSelected ? Font.IBMPlexSans_500Medium : Font.IBMPlexSans_400Regular
        }
      />
    </Radio.Root>
  );
};

export default SelectUnselectOptionButton;
