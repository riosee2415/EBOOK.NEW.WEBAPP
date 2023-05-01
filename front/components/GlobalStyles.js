import { createGlobalStyle, css } from "styled-components";
// import SCDream1_otf from "../public/fonts/SCDream1.otf";
// import SCDream1_woff from "../public/fonts/SCDream1.woff";
// import SCDream2_otf from "../public/fonts/SCDream2.otf";
// import SCDream2_woff from "../public/fonts/SCDream2.woff";
// import SCDream3_otf from "../public/fonts/SCDream3.otf";
// import SCDream3_woff from "../public/fonts/SCDream3.woff";
// import SCDream4_otf from "../public/fonts/SCDream4.otf";
// import SCDream4_woff from "../public/fonts/SCDream4.woff";
// import SCDream5_otf from "../public/fonts/SCDream5.otf";
// import SCDream5_woff from "../public/fonts/SCDream5.woff";
// import SCDream6_otf from "../public/fonts/SCDream6.otf";
// import SCDream6_woff from "../public/fonts/SCDream6.woff";
// import SCDream7_otf from "../public/fonts/SCDream7.otf";
// import SCDream7_woff from "../public/fonts/SCDream7.woff";
// import SCDream8_otf from "../public/fonts/SCDream8.otf";
// import SCDream8_woff from "../public/fonts/SCDream8.woff";
// import SCDream9_otf from "../public/fonts/SCDream9.otf";
// import SCDream9_woff from "../public/fonts/SCDream9.woff";

const fontStyle = css`
  /* 관리자 폰트 입니다. 건들지 마세요. */
  @font-face {
    font-family: "GmarketSansMedium";
    src: url("https://cdn.jsdelivr.net/gh/projectnoonnu/noonfonts_2001@1.1/GmarketSansMedium.woff")
      format("woff");
    font-weight: normal;
    font-style: normal;
  }

  @font-face {
    font-family: "SCDream";
    font-style: 100;
    font-weight: 100;
    src: url("/fonts/SCDream1.woff") format("woff"),
      url("/fonts/SCDream1.otf") format("opentype");
  }
  @font-face {
    font-family: "SCDream";
    font-style: 200;
    font-weight: 200;
    src: url("/fonts/SCDream2.woff") format("woff"),
      url("/fonts/SCDream2.otf") format("opentype");
  }
  @font-face {
    font-family: "SCDream";
    font-style: 300;
    font-weight: 300;
    src: url("/fonts/SCDream3.woff") format("woff"),
      url("/fonts/SCDream3.otf") format("opentype");
  }
  @font-face {
    font-family: "SCDream";
    font-style: 400;
    font-weight: 400;
    src: url("/fonts/SCDream4.woff") format("woff"),
      url("/fonts/SCDream4.otf") format("opentype");
  }
  @font-face {
    font-family: "SCDream";
    font-style: 500;
    font-weight: 500;
    src: url("/fonts/SCDream5.woff") format("woff"),
      url("/fonts/SCDream5.otf") format("opentype");
  }
  @font-face {
    font-family: "SCDream";
    font-style: 600;
    font-weight: 600;
    src: url("/fonts/SCDream6.woff") format("woff"),
      url("/fonts/SCDream6.otf") format("opentype");
  }
  @font-face {
    font-family: "SCDream";
    font-style: 700;
    font-weight: 700;
    src: url("/fonts/SCDream7.woff") format("woff"),
      url("/fonts/SCDream7.otf") format("opentype");
  }
  @font-face {
    font-family: "SCDream";
    font-style: 800;
    font-weight: 800;
    src: url("/fonts/SCDream8.woff") format("woff"),
      url("/fonts/SCDream8.otf") format("opentype");
  }
  @font-face {
    font-family: "SCDream";
    font-style: 900;
    font-weight: 900;
    src: url("/fonts/SCDream9.woff") format("woff"),
      url("/fonts/SCDream9.otf") format("opentype");
  }
  /*  */
  @font-face {
    font-family: "twayair";
    src: url("https://cdn.jsdelivr.net/gh/projectnoonnu/noonfonts_tway@1.0/twayair.woff")
      format("woff");
    font-weight: normal;
    font-style: normal;
  }
`;

const GlobalStyles = createGlobalStyle`
  ${fontStyle}

  
  body {
    font-family: 'Noto Sans KR', sans-serif;
  }

  .whole__admin__wrapper {
    font-family: "GmarketSansMedium", sans-serif !important;
  }

  a {
    color : inherit;
    text-decoration : none;
  }

  textarea {
    resize: none;
    outline: none;
  }

  input {
    outline: none;
  }
  
  a:hover {
    color : inherit;
  }

  //ant select
  .ant-select-focused:not(.ant-select-disabled).ant-select:not(.ant-select-customize-input) .ant-select-selector{
    border-color: ${(props) => props.theme.basicTheme_C};
    box-shadow: 0 0 0 2px ${(props) => props.theme.lightGrey2_C};
  }

  //ant radio
  .ant-radio-checked .ant-radio-inner, .ant-radio:hover .ant-radio-inner{
    border-color: ${(props) => props.theme.basicTheme_C};
  }

  .ant-radio-inner::after{
    background-color: ${(props) => props.theme.basicTheme_C};
  }

  .ant-radio-checked::after{
    border: 1px solid ${(props) => props.theme.basicTheme_C};
  }

  //ant checkbox
  .ant-checkbox-input:focus + .ant-checkbox-inner {
    border-color: ${(props) => props.theme.basicTheme_C};
  }
  .ant-checkbox-checked .ant-checkbox-inner {
    background-color: ${(props) => props.theme.basicTheme_C};
    border: 1px solid ${(props) => props.theme.basicTheme_C};
  }

  .ant-checkbox-wrapper:hover {
    .ant-checkbox-inner,
    .ant-checkbox-checked::after {
      border-color: ${(props) => props.theme.basicTheme_C} !important;
      border: 1px solid ${(props) => props.theme.basicTheme_C};
    }
  }

  //ant picker
  .ant-picker:hover,
  .ant-picker-focused {
    border-color: ${(props) => props.theme.basicTheme_C};
    box-shadow: 0 0 0 2px ${(props) => props.theme.lightGrey2_C};
  }

  .ant-picker-range .ant-picker-active-bar, 
  .ant-picker-cell-in-view.ant-picker-cell-selected .ant-picker-cell-inner, 
  .ant-picker-cell-in-view.ant-picker-cell-range-start .ant-picker-cell-inner, 
  .ant-picker-cell-in-view.ant-picker-cell-range-end .ant-picker-cell-inner{
    background: ${(props) => props.theme.basicTheme_C};
  }

  .ant-picker-cell-in-view.ant-picker-cell-today .ant-picker-cell-inner::before{
    border: 1px solid ${(props) => props.theme.basicTheme_C};
  }

  .ant-btn:focus{
    color: ${(props) => props.theme.black_C};
    border-color: ${(props) => props.theme.basicTheme_C};
  }
  
  @media (max-width : 576px) {
    html { 
      font-size : 14px;
    }
  }
`;

export default GlobalStyles;
