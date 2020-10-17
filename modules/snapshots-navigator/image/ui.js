import styled from 'styled-components';

export const Outer = styled.div`
  --navigation-buttons-height: 65px;
  padding-bottom: var(--navigation-buttons-height);
`;

export const CompareList = styled.ul`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
  margin: 0;
  padding: 0;
  list-style: none;

  > li {
    margin: 0;
    padding: 0;
  }
`;

export const Bottom = styled.div`
  height: var(--navigation-buttons-height);
  position: fixed;
  background: #fff;
  bottom: 0;
  left: 0;
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
`;

export const BottomInner = styled.div`
  flex: 1;
  display: flex;
  justify-content: space-between;
  max-width: 500px;
  margin: 0 auto;

  > span {
    flex: 1 1 50%;
    display: flex;
    justify-content: center;

    > button {
      flex: 1 1 50%;
      padding: 0;
      outline-offset: -5px;
      white-space: nowrap;

      &:active {
        transform: scale(0.9);
      }

      &,
      * {
        touch-action: manipulation;
      }

      &:disabled {
        opacity: 0.25;
      }

      svg:not(:first-child) {
        margin-left: -10px;
      }
    }
  }
`;

export const SwitchOuter = styled.div`
  flex: 0 0 100px;
  display: flex;
  justify-content: center;
  cursor: pointer;

  input {
    appearance: none;
    position: absolute;
    top: 0;
    left: 0;
    opacity: 0;
  }

  label {
    display: flex;
    align-items: center;

    svg {
      margin-right: 10px;
      position: relative;
      top: 2px;
    }
  }
`;
