import React from 'react';
import {HashOutlet} from '@acrool/react-router-hash';
import styled from "styled-components";

const EditLayout = () => {


    return <ModalContainer>

        <Content>
            <header>
                <h2>Edit Modal</h2>
            </header>
            <HashOutlet/>
        </Content>


    </ModalContainer>;
};

export default EditLayout;


const Content = styled.div`
    background: #fff;
    color: #000;
    width: 500px;
    height: auto;
    margin: auto;
  position: absolute;
  left: 50%;
  top: 50%;
  transform: translate(-50%, -50%);
  z-index: 1;
  
  padding: 10px;
  border-radius: 4px;
  
  h2{
    line-height: 0;
  }
`;

const ModalContainer = styled.div`
  position: fixed;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
  
  background: rgba(0,0,0,.5);
`;
