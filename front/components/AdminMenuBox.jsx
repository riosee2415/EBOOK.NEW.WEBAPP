import React from "react";
import styled, { keyframes } from "styled-components";
import { Wrapper, Image, Text } from "./commonComponents";
import Theme from "./Theme";
import { useRouter } from "next/router";

const menuHoverAni1 = keyframes`
    0% {
        width: 0%;
    } 100% {
        width: 100%;
        border-radius : 8px;
    }
`;

const menuHoverAni2 = keyframes`
    0% {
        height: 0%;
    } 100% {
        height: 100%;
        border-radius : 8px;
    }
`;
const MenuBox = styled.div`
  width: 320px;
  height: 240px;
  border: 1px solid ${(props) => props.theme.lightGrey_C};
  border-radius: 8px;
  margin: 30px;
  padding: 20px 10px;
  position: relative;
  transition: 0.6s;
  cursor: pointer;
  &:hover {
    box-shadow: 1px 1px 6px #ddd;
  }
  &:hover:before {
    animation: ${menuHoverAni1} 0.3s forwards;
  }
  &:hover:after {
    animation: ${menuHoverAni2} 0.3s forwards;
  }
  &:before {
    content: "";
    position: absolute;
    width: 0%;
    height: 100%;
    top: 0px;
    left: 0px;
    border-top: 1px solid ${(props) => props.theme.adminTheme_2};
    border-bottom: 1px solid ${(props) => props.theme.adminTheme_2};
  }
  &:after {
    content: "";
    position: absolute;
    width: 100%;
    height: 0%;
    top: 0px;
    left: 0px;
    border-left: 1px solid ${(props) => props.theme.adminTheme_2};
    border-right: 1px solid ${(props) => props.theme.adminTheme_2};
    z-index: -1;
  }
`;

const MenuTitle = styled.div`
  position: absolute;
  padding: 1px 20px;
  top: -10px;
  left: -5px;
  background-color: ${(props) => props.theme.adminTheme_1};
  color: ${(props) => props.theme.white_C};
  font-size: 14px;
  border-radius: 5px;
`;

const MenuItem = styled.a`
  display: block;
  width: 100%;
  height: 20px;
  border-bottom: 1px solid ${(props) => props.theme.lightGrey_C};
  margin-bottom: 5px;
  transition: 0.6s;
  position: relative;
  &:hover {
    color: ${(props) => props.theme.adminTheme_4};
  }
`;

const ScrollBox = styled.div`
  height: 100%;
  overflow: auto;
`;

const AdminMenuBox = ({ title, menus, right }) => {
  const router = useRouter();

  const movePage = (path) => {
    router.push(path);
  };

  if (right) {
    return (
      <MenuBox right={right}>
        <MenuTitle>{title}</MenuTitle>

        <ScrollBox>
          {menus.map((v) => {
            if (!v.useYn) return;
            return (
              <MenuItem key={v.name} onClick={() => movePage(v.link)}>
                {v.name}
              </MenuItem>
            );
          })}
        </ScrollBox>
      </MenuBox>
    );
  } else {
    return null;
  }
};

export default AdminMenuBox;
