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
        <div>
            <div className={styles.navbar}>
                <nav>
                    <h2>AIChef</h2>
                    <a href="/">Home</a>
                    <a href="https://github.com/lekkasgit/aichef">GitHub</a>
                </nav>
            </div>
            
            <div>{children}</div>
        </div>
    );
};