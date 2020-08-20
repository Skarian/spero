import React, { useState } from 'react';
import { motion } from 'framer-motion';
import styled from 'styled-components';

const ButtonWrapper = styled.div`
  display: flex;
  width: 500px;
  height: 250px;
  background-color: grey;
  border-radius: 25px;
  align-items: center;
  margin-left: 200px;
  margin-top: 200px;
  padding: 25px;
`;

const Button = styled(motion.div)`
  height: 200px;
  width: 200px;
  background-color: orange;
  border-radius: 25px;
`;

const Custom = () => {
  const [button, setButton] = useState(false);
  return (
    <motion.div exit={{ opacity: 0 }}>
      <ButtonWrapper
        style={{ justifyContent: button ? 'flex-end' : 'flex-start' }}
        onClick={() => {
          setButton(!button);
        }}
      >
        <Button layout transition={{ type: 'spring', stiffness: 700, damping: 100 }} />
      </ButtonWrapper>
    </motion.div>
  );
};

export default Custom;
