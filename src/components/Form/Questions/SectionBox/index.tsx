import React, { ChangeEvent, useCallback, useEffect, useState } from 'react';
import { SectionBoxWrapper, SectionTitle } from './styles';
import { Select } from 'antd';
import { useRecoilState, useRecoilValue } from 'recoil';
import {
  changeSection,
  nowFocusIndex,
  nowQuestion,
  questions,
  sectionLens,
  sectionNames,
} from '../../../../recoil/MakeForm/atom';
import FormInput from '../../../ui/FormInput';
import { DescriptionQue, GridQue, SelectionQue } from '../../../../typings/makeForm';
import { useLocation } from 'react-router-dom';
import ResFormInfo from '../../DirectResForm/ResFormInfo';

interface Props {
  children: React.ReactNode;
  index: number;
}

export default function SectionBox({ children, index }: Props) {
  const [questionList, setQuestionList] = useRecoilState(questions);
  const [option, setOption] = useState<{ value: number; label: number; disabled: boolean }[]>([]);
  const [isChange, setIsChange] = useRecoilState(changeSection);
  const [sectionList, setSectionList] = useRecoilState(sectionNames);
  const [nowIndex, setNowIndex] = useRecoilState(nowFocusIndex);
  const accrueQue = useRecoilValue(sectionLens);
  const [nowQueInfo, setNowQueInfo] = useRecoilState(nowQuestion);
  const secNames = useRecoilValue(sectionNames);
  const { pathname } = useLocation();

  const onChangeSectionName = useCallback(
    (e: ChangeEvent<HTMLInputElement>) => {
      const temp: string[] = JSON.parse(JSON.stringify(sectionList));
      temp[index] = e.target.value;
      setSectionList(temp);
    },
    [sectionList]
  );

  const onChangeSection = useCallback(
    (value: string) => {
      const temp: (DescriptionQue | SelectionQue | GridQue)[][] = JSON.parse(JSON.stringify(questionList));
      const sectionName: string[] = JSON.parse(JSON.stringify(sectionList));

      const [target] = temp.splice(index, 1);
      temp.splice(+value, 0, target);
      const [targetName] = sectionName.splice(index, 1);
      sectionName.splice(+value, 0, targetName);

      let idx = 0;
      let count = 0;
      if (+value !== 0) {
        for (let i = 0; i < +value; i++) {
          count += temp[i].length;
        }
        idx = count;
      }

      setQuestionList(temp);
      setSectionList(sectionName);
      setIsChange(true);
      setNowIndex(idx);
      setNowQueInfo({ row: +value, col: 0 });
    },
    [questionList, setQuestionList, isChange, sectionList, nowIndex, accrueQue, nowQueInfo]
  );

  useEffect(() => {
    const temp: { value: number; label: number; disabled: boolean }[] = [];
    for (let i = 0; i < questionList.length; i++) {
      temp.push({ value: i, label: i + 1, disabled: i === index });
    }
    setOption(temp);
  }, [questionList, index]);

  useEffect(() => {
    if (index === questionList.length - 1 && isChange) {
      const temp: (DescriptionQue | SelectionQue | GridQue)[][] = JSON.parse(JSON.stringify(questionList));

      for (let i = 0; i < temp.length; i++) {
        for (let j = 0; j < temp[i].length; j++) {
          if (temp[i][j]['sectionNum'] === i) continue;
          temp[i][j]['sectionNum'] = i;
        }
      }

      setQuestionList(temp);
      setIsChange(false);
    }
  }, [questionList, option, onChangeSection, index, isChange]);

  return (
    <SectionBoxWrapper>
      <div>
        {pathname.slice(1, 10) === 'directres' || pathname.slice(1, 7) === 'mypage' ? (
          <SectionTitle>{secNames?.[index] || '섹션 제목'}</SectionTitle>
        ) : (
          <FormInput
            value={sectionList[index] || ''}
            onChange={onChangeSectionName}
            width={'50%'}
            fontSize={1.8}
            placeholder={'섹션 이름'}
          />
        )}
        {pathname.slice(1, 10) !== 'directres' && pathname.slice(1, 7) !== 'mypage' && (
          <span>
            <span>섹션 순서</span>
            <Select value={`${index + 1}`} style={{ width: 100 }} onChange={onChangeSection} options={option} />
          </span>
        )}
      </div>
      {children}
    </SectionBoxWrapper>
  );
}
