import React, { ChangeEvent, useCallback, useEffect, useRef, useState } from 'react';
import FormInput from '../../../../ui/FormInput';
import { useRecoilState } from 'recoil';
import { resDescriptionSets } from '../../../../../recoil/Resform/atom';
import { ResDescription } from '../../../../../typings/resForm';
import { useMessage } from '../../../../../hooks/useMessage';

interface Props {
  id: number;
}

export default function Short({ id }: Props) {
  const [resData, setResData] = useRecoilState(resDescriptionSets);
  const [idx, setIdx] = useState(-1);
  const { showMessage, contextHolder } = useMessage();

  const onChange = useCallback(
    (e: ChangeEvent<HTMLInputElement>) => {
      if (e.target.value.length > 500) {
        showMessage('warning', '글자 수가 너무 많아요');
        return;
      }

      const temp = JSON.parse(JSON.stringify(resData));

      if (e.target.value === '') {
        (temp[idx] as ResDescription).content = null;
        setResData(temp);
        return;
      }

      (temp[idx] as ResDescription).content = e.target.value;
      setResData(temp);
    },
    [idx, resData]
  );

  useEffect(() => {
    resData.find((que, index) => {
      if ('question_id' in que && que.question_id === id) setIdx(index);
    });
  }, [resData, idx]);

  return (
    <>
      {contextHolder}
      <FormInput
        value={idx !== -1 ? (resData[idx] as ResDescription)['content'] || '' : ''}
        onChange={onChange}
        width={'50%'}
        fontSize={1.6}
        disabled={false}
        placeholder={'내 답변'}
      />
    </>
  );
}
