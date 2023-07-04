//   _                             _   
// | |                           | |  
// | |     __ _ _   _  ___  _   _| |_ 
// | |    / _` | | | |/ _ \| | | | __|
// | |___| (_| | |_| | (_) | |_| | |_ 
// |______\__,_|\__, |\___/ \__,_|\__|
//               __/ |                
//              |___/                 

import Head from 'next/head';
import Image from 'next/image';
import styles from './layout.module.css';

export default function Layout({ children, home }) {
    return (
        <div className={styles.navbar}>
            Navigation Bar for AIChef
        </div>
    );
};