import styled from 'styled-components';

interface TitleProps {
    weight?: 200 | 300 | 400 | 500 | 600 | 700;
}

export const Title1 = styled.h1<TitleProps>`
  font-size: 24px;
  color:${({ theme }) => theme.colors.primaryColor};
  font-weight: ${({ weight = 700 }) => weight};
`;
export const Title2 = styled.h1<TitleProps>`
  font-size: 18px;
  color:${({ theme }) => theme.colors.primaryColor};
  font-weight: ${({ weight = 600 }) => weight};
`;

export const Typography = styled.p`
  color: ${({ theme }) => theme.colors.primaryColor};
`;

export const HStack = styled.div`
  display:flex;
  flex-direction:row;
`;

export const VStack = styled.div`
width:100%;
height:100%;
  display:flex;
  flex-direction:column;
`;
