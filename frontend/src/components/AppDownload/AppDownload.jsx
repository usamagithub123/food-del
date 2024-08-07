import React from 'react';
import './AppDownload.css';
import { assets } from '../../assets/assets';
import { motion } from 'framer-motion';

const slideLeftAnimation = {
  initial: { x: '-100%', opacity: 0 },
  animate: { x: 0, opacity: 1, transition: { duration: 0.8 } }
};

const slideRightAnimation = {
  initial: { x: '100%', opacity: 0 },
  animate: { x: 0, opacity: 1, transition: { duration: 0.6 } }
};

const AppDownload = () => {
  return (
    <motion.div
      className='app-download'
      id='app-download'
      initial="initial"
      whileInView="animate"
      viewport={{ once: true }}
    >
      <motion.p
        variants={slideLeftAnimation}
      >
        For Better Experience Download <br /> Tomato App
      </motion.p>
      <div className="app-download-platforms">
        <motion.img
          src={assets.play_store}
          alt="Play Store"
          initial="initial"
          whileInView="animate"
          viewport={{ once: true }}
          variants={slideLeftAnimation}
        />
        <motion.img
          src={assets.app_store}
          alt="App Store"
          initial="initial"
          whileInView="animate"
          viewport={{ once: true }}
          variants={slideRightAnimation}
        />
      </div>
    </motion.div>
  );
};

export default AppDownload;
