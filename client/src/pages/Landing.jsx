import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import styles from './Landing.module.css';

const Landing = () => {
  return (
    <div className={styles.container}>
      <header className={styles.header}>
        <div className={styles.logo}>DocVerse AI</div>
        <nav>
          <Link to="/login" className={styles.loginBtn}>Login / Register</Link>
        </nav>
      </header>

      <main className={styles.main}>
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className={styles.hero}
        >
          <h1 className={styles.headline}>
            Create, Convert, Edit, and Enhance Documents with <span className="gradient-text">AI</span>.
          </h1>
          <p className={styles.subtitle}>
            The all-in-one intelligent document studio powered by Gemini. 
            Generate professional reports, convert between formats effortlessly, and get an AI assistant right in your editor.
          </p>
          <div className={styles.ctaContainer}>
            <Link to="/login" className={styles.ctaBtn}>Get Started for Free</Link>
          </div>
        </motion.div>

        <div className={styles.features}>
          {['AI Document Generator', 'Universal File Converter', 'Rich Document Editor', 'AI Document Assistant'].map((feature, i) => (
            <motion.div 
              key={i}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: i * 0.1 + 0.5 }}
              className={`glass-panel ${styles.featureCard}`}
            >
              <h3>{feature}</h3>
            </motion.div>
          ))}
        </div>
      </main>
    </div>
  );
};

export default Landing;
