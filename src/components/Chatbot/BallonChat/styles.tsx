import styled from 'styled-components';

export const ChatbotWrapper = styled.div`
  width: 50%;
  min-width: fit-content;
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: self-start;
  margin-right: auto;
`;

export const BallonWrapper = styled.div`
  display: flex;
  flex-direction: row;
  margin-bottom: 2rem;
  width: 100%;
`;

export const GAK = styled.div`
  display: flex;
  flex-direction: column;
  width: 10%;
  margin-top: auto;
  margin-bottom: 1rem;
  margin-right: 1rem;

  & > img {
    width: 100%;
    margin-bottom: 1rem;
  }

  & > span:first-of-type {
    font-size: 1.2rem;
    font-weight: 600;
    align-items: center;
    margin: auto;
  }
`;

export const ChatBallon = styled.div`
  position: relative;
  font-size: 1.3rem;
  font-weight: 700;
  line-height: 2rem;
  max-width: 75%;
  border-radius: 4rem;
  padding: 2rem;
  text-align: left;
  color: #2d2d2d;
  background: #eeeeee;
  margin-bottom: 1rem;
  word-wrap: break-word;

  margin-left: 1rem;

  &:before {
    content: '';
    width: 0px;
    height: 0px;
    position: absolute;
    border-left: 24px solid #eeeeee;
    border-right: 12px solid transparent;
    border-top: 12px solid #eeeeee;
    border-bottom: 20px solid transparent;
    left: -6px;
    bottom: -8px;
    transform: rotate(30deg);
  }

  box-shadow: 2px 4px 10px 0px rgba(0, 0, 0, 0.1);
  -webkit-box-shadow: 2px 4px 10px 0px rgba(0, 0, 0, 0.1);
  -moz-box-shadow: 2px 4px 10px 0px rgba(0, 0, 0, 0.1);
`;

export const UserWrapper = styled.div`
  width: 50%;
  display: flex;
  flex-direction: column;
  justify-content: flex-end;
  align-items: self-end;
  margin-left: auto;
`;

export const UserBallon = styled.div`
  position: relative;
  font-size: 1.3rem;
  font-weight: 700;
  line-height: 2rem;

  max-width: 75%;
  background: #f7e9a6;
  border-radius: 4rem;
  padding: 2rem;
  text-align: left;
  color: #2d2d2d;
  background-color: #f7e9a6;
  margin-bottom: 1rem;
  word-wrap: break-word;
  margin-right: 1rem;

  display: flex;
  justify-content: flex-end;
  align-items: flex-end;
  margin-left: auto;
  &:before {
    content: '';
    width: 0px;
    height: 0px;
    position: absolute;
    border-right: 24px solid #f7e9a6;
    border-left: 12px solid transparent;
    border-top: 12px solid #f7e9a6;
    border-bottom: 20px solid transparent;
    right: -6px;
    bottom: -8px;
    transform: rotate(-30deg);
  }

  box-shadow: 2px 4px 10px 0px rgba(0, 0, 0, 0.1);
  -webkit-box-shadow: 2px 4px 10px 0px rgba(0, 0, 0, 0.1);
  -moz-box-shadow: 2px 4px 10px 0px rgba(0, 0, 0, 0.1);
`;
