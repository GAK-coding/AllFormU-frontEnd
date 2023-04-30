import { useRecoilValue, useSetRecoilState } from 'recoil';
import { color } from '../../../recoil/Color/atom';
import { formInfoList } from '../../../recoil/FormList/atom';
import { FormInfo } from '../../../typings/makeForm';
import { useEffect } from 'react';
import { ButtonWrapper, FormBox, FormListWrapper, HeaderWrapper, Title } from '../styles';
import Button from '../../../components/ui/Button';

export default function ResFormList() {
  const { blue } = useRecoilValue(color);

  const setFormInfoList = useSetRecoilState(formInfoList);

  useEffect(() => {
    const dummyData: FormInfo[] = [
      {
        title: 'Title 1',
        description: 'Description 1',
      },
      {
        title: 'Title 2',
        description: 'Description 2',
      },
      {
        title: 'Title 3',
        description: 'Description 3',
      },
      {
        title: 'Title 4',
        description: 'Description 4',
      },
    ];

    setFormInfoList(dummyData);
  }, []);

  const formInfoListData = useRecoilValue(formInfoList);

  return (
    <>
      <HeaderWrapper>
        <span>내 응답폼</span>
      </HeaderWrapper>

      <FormListWrapper>
        {formInfoListData.map((formInfo, idx) => {
          return (
            <FormBox key={idx}>
              <Title>
                <div>
                  {formInfo.title}
                  <span>{formInfo.description}</span>
                </div>
              </Title>

              <ButtonWrapper>
                <Button color={'black'} bgColor={blue} fontSize={1.3} width={10} height={3.5}>
                  응답확인
                </Button>
              </ButtonWrapper>
            </FormBox>
          );
        })}
      </FormListWrapper>
    </>
  );
}
