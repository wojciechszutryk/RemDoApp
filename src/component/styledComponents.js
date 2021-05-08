import styled from 'styled-components';

const ParentButton = styled.button`
    text-decoration: none;
    cursor: pointer;
    &:focus {
      outline: none;
    }
`;

export const InlineButton = styled(ParentButton)`
    color: rgb(100, 100, 100);
    z-index: 2;
    position: relative;
    padding: ${({theme}) => theme.spacing.xs}px ${({theme}) => theme.spacing.sm}px;
    margin: 0 ${({theme}) => theme.spacing.xs}px;
    border-radius: ${({theme}) => theme.spacing.xs}px;
    border-style: none;
    background-color: #fff;
    overflow: hidden;
    font-family: 'Roboto', sans-serif;
    font-weight: 600;
    &::after{
        content: "";
        position: absolute;
        width: 100%;
        height: 3px;
        bottom: 0;
        left: -100%;
        background-color: #000;
        transition: .3s cubic-bezier(0.61, 0.01, 0.87, 1.01);
    }
    
    &:hover::after{
        left: 0;
    }
`;

export const TransactionButton = styled(ParentButton)`
  position: relative;
  width: 100px;
  height: 50px;
  padding: 3px 2px;
  border: 1px solid black;
  color: black;
  background-color: #eee;
  line-height: 20px;
  text-align: center;
  cursor: pointer;
  transition: .1s .1s;
  text-decoration: none;
  font-size: 20px;
  text-transform: uppercase;
  letter-spacing: .3px;
  font-weight: 600;
  z-index: 3;
  font-family: 'Trebuchet MS', sans-serif;
  &:hover {
    color: grey;
  }

  &::before {
    content: "";
    position: absolute;
    top: 50%;
    left: 0;
    width: 0;
    height: 0;
    background-color: grey;
    line-height: 100%;
    transition: width .15s linear, height .25s .17s;
    z-index: -1;
  }

  &:hover::before {
    width: 100%;
    height: 50%;
  }

  &:after {
    content: "";
    position: absolute;
    bottom: 50%;
    left: 0;
    width: 0;
    height: 0;
    background-color: grey;
    transition: width .15s linear, height .25s .17s;
    z-index: -1;
  }

  &:hover:after {
    height: 50%;
    width: 100%;
  }
`;

export const StyledColorInput = styled.input`
    width: 25px;
    height: 25px;
    border-radius: 50%;
    border: 3px solid gray;
`;

export const SubmitButton = styled(ParentButton)`
    display: inline;
    width: 30px !important;
    height: 25px !important;
    margin-top: 10px;
    padding: 3px 4px;
    border: none;
    line-height: 12px;
    background-color: gray;
    text-decoration: none;
    color: white;
    border-radius: 4px;
    font-size: 16px;
    letter-spacing: .08em;
    text-transform: uppercase;
    position: relative;
    transition: background-color .6s ease;
    overflow: hidden;
    &:after {
        content: "";
        position: absolute;
        width: 0;
        height: 0;
        top: 50%;
        left: 50%;
        transform-style: flat;
        transform: translate3d(-50%,-50%,0);
        background: rgba(255,255,255,.1);
        border-radius: 100%;
        transition: width .3s ease, height .3s ease;
    }
    &:focus,
        &:hover {
            background: orange;
    }
    &:active {
        &:after {
            width: 200px;
            height: 200px;
        }
    }
`;

export const DeleteButton = styled(SubmitButton)`
    display: flex;
    justify-content: center;
    height: 20px;
    margin: 0;
    padding: 2px;
    background-color: gray;
    transition: transform .1s linear;
      & svg path {
        transition: transform .2s linear;
      }
    &:hover{
      & svg path {
        transform-origin: center;
        transform: rotate(360deg);
      }
    }
    &:focus,
      &:hover {
        background: red;
    }
`;

export const AddBudgetButton = styled(TransactionButton)`
    margin-top: ${({theme}) => theme.spacing.xs}px;
    border-radius: ${({theme}) => theme.spacing.normal}px;
    height: 40px;
    font-family: 'Times New Roman', sans-serif;
    font-weight: 500;
    font-size: .8rem;
    &::before{
      background-color: ${({theme}) => theme.colors.purple.dark};
      border-bottom-left-radius: ${({theme}) => theme.spacing.normal}px;
      border-bottom-right-radius: ${({theme}) => theme.spacing.normal}px;
    }
    &:after{
      background-color: ${({theme}) => theme.colors.purple.dark};
      border-top-left-radius: ${({theme}) => theme.spacing.normal}px;
      border-top-right-radius: ${({theme}) => theme.spacing.normal}px;
    }
    &:hover{
      border-color: ${({theme}) => theme.colors.gray.white};
    }
`;