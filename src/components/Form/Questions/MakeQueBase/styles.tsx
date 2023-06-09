import styled from 'styled-components';

export const QueWrapper = styled.div`
  position: relative;
  border-radius: 4rem;
  margin: 0 auto;
  margin-bottom: 2rem;
  padding: 2rem 3rem;
  box-sizing: border-box;

  width: 90%;
  max-width: 100rem;
  background-color: var(--color-light-purple-30);

  -webkit-box-shadow: 0 10px 20px rgba(0, 0, 0, 0.19), 0 6px 6px rgba(0, 0, 0, 0.23);
  -moz-box-shadow: 0 10px 20px rgba(0, 0, 0, 0.19), 0 6px 6px rgba(0, 0, 0, 0.23);
  -ms-box-shadow: 0 10px 20px rgba(0, 0, 0, 0.19), 0 6px 6px rgba(0, 0, 0, 0.23);
  -o-box-shadow: 0 10px 20px rgba(0, 0, 0, 0.19), 0 6px 6px rgba(0, 0, 0, 0.23);
  box-shadow: 0 10px 20px rgba(0, 0, 0, 0.19), 0 6px 6px rgba(0, 0, 0, 0.23);
`;

export const DeleteBtn = styled.span`
  position: absolute;
  top: 1rem;
  right: 2rem;

  font-size: 2.6rem;
  cursor: pointer;

  z-index: 20;
`;

export const QueBody = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  justify-content: space-evenly;

  position: relative;
`;

export const CheckMark = styled.div`
  position: absolute;
  top: 0rem;
  left: -3rem;

  width: 0.8rem;
  height: 100%;

  border-radius: 4rem 0 0 4rem;
  background-color: var(--color-sub-blue);
`;

export const QueTop = styled.div`
  min-height: 6rem;

  display: flex;
`;

export const QueTopLeft = styled.div`
  display: flex;
  align-items: center;

  width: 70%;
  box-sizing: border-box;

  //border: 1px solid;
`;

export const QueTopRight = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  width: 30%;

  //border: 1px solid;

  box-sizing: border-box;

  .custom-select .ant-select-selector {
    background-color: inherit;
    border-radius: 2rem;
    color: #696969;

    text-align: center;
  }
`;

export const QueBottom = styled.div`
  display: flex;
`;

export const QueBottomLeft = styled.div`
  //border: 1px solid;

  width: 70%;
  min-height: 6rem;
  box-sizing: border-box;

  display: flex;
  align-items: center;
`;

export const QueBottomRight = styled.div`
  width: 30%;
  min-height: 6rem;

  display: flex;
  justify-content: space-evenly;
  align-items: flex-end;
  padding: 0.5rem;
  padding-top: 2rem;
  box-sizing: border-box;

  .custom-select .ant-select-selector {
    background-color: inherit;
    border-radius: 2rem;
    color: #696969;

    text-align: center;
  }

  & > div {
    height: 10%;
    display: flex;
    align-items: center;
  }

  & > div > span {
    color: #afafaf;
    font-weight: 700;
    margin-right: 0.5rem;
  }
`;
