import styled from 'styled-components';

export const Button = styled.button`
  background-color: ${({ theme }) => theme.primary.main};
  border: none;
  border-radius: 2rem;
  padding: 0.6rem 0.8rem;
  font-weight: 600;
  cursor: pointer;
`;
