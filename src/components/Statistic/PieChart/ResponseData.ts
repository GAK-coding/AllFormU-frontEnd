import { QueResInfo } from '../../../typings/statistic';

interface DataItem {
  id: string;
  label: string;
  value: number;
  color: string;
}

interface Data {
  data: DataItem[];
}

export const ResponseData = ({ queInfo: queInfo, options: options }: QueResInfo): Data => {
  const colors = [
    'hsl(200, 70%, 50%)',
    'hsl(237, 70%, 50%)',
    'hsl(334, 70%, 50%)',
    'hsl(44, 70%, 50%)',
    'hsl(91, 70%, 50%)',
  ];

  // console.log(queInfo);
  const data: DataItem[] = [];

  //TODO : 상위 5개만 보여주기 (주관식은 마지막은 기타로 통일해야함)
  // if (queInfo.num.length >= 5) {
  // }

  // description 응답 정보
  if ('opList' in queInfo) {
    queInfo.opList.map((op, idx) => {
      if (op !== null) {
        data.push({
          id: op!,
          label: op!,
          value: queInfo.num[idx]!,
          color: colors[Math.floor(Math.random() * colors.length)],
        });
      }
    });
  }
  // selection 응답 정보
  else {
    queInfo?.num?.map((num, key) => {
      if (num !== 0) {
        data.push({
          id: options?.[key].content || '',
          label: options?.[key].content || '',
          value: queInfo.num[key]!,
          color: colors[Math.floor(Math.random() * colors.length)],
        });
      }
    });
  }

  // console.log(data);
  return {
    data,
  };
};
