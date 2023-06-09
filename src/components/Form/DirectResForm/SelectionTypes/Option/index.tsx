import React, { useCallback, useEffect, useRef, useState } from 'react';
import { OptionWrapper, Radios } from './styles';
import { SelectionQue } from '../../../../../typings/makeForm';
import { Radio } from 'antd';
import { useRecoilState } from 'recoil';
import type { RadioChangeEvent } from 'antd';
import { checkSelection, resDescriptionSets, resSelectionSets } from '../../../../../recoil/Resform/atom';
import { ResSelection, ResSelections } from '../../../../../typings/resForm';

interface Props {
  data: SelectionQue;
  id: number;
}

export default function Option({ data, id }: Props) {
  const [selectedOption, setSelectedOption] = useState<number | null>(null); // 선택된 라디오 버튼의 인덱스를 추적하는 상태
  const ref = useRef<number | null>(null);
  const [chkSelection, setChkSelection] = useRecoilState(checkSelection);

  const handleRadioChange = useCallback((e: RadioChangeEvent) => {
    const selectedIndex = parseInt(e.target.value); // 선택된 라디오 버튼의 인덱스
    setSelectedOption(selectedIndex); // 선택된 라디오 버튼의 인덱스를 상태에 업데이트
  }, []);

  useEffect(() => {
    if (selectedOption === null) return;

    const temp: ResSelections = JSON.parse(JSON.stringify(chkSelection));
    (temp[id] as ResSelection)['num'] = ref.current!;
    setChkSelection(temp);
  }, [selectedOption, ref]);

  return (
    <OptionWrapper>
      <Radio.Group name="radiogroup" onChange={handleRadioChange}>
        <Radios>
          {data.options.map((option, idx) => {
            if (option.id === selectedOption) ref.current = idx;

            return (
              <Radio key={idx} value={option.id}>
                {option.content}
              </Radio>
            );
          })}
        </Radios>
      </Radio.Group>
    </OptionWrapper>
  );
}
