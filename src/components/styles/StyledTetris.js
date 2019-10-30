import styled from 'styled-components';

// width: 95vw;
// height: 95vh;

export const StyledTetrisWrapper = styled.div`
width: 100vw;
height: 100vh;


position: absolute;
top: 0;
overflow: hidden;

outline: none;
`


// export const StyledTetrisWrapper = styled.div`
// width: 100vw;
// height: 100vh;
// background: url(${bgImage}) #000;
// background-size: cover;
// overflow: hidden;
// `

export const StyledTetris = styled.div`
display: flex;
align-items: flex-start;
padding: 40px;
margin: 0 auto;
max-width: 900px;

aside{
  width: 100%;
  max-width: 200px;
  display: block;
  padding: 0 20px;
}
`
