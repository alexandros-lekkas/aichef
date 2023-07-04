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
import Link from 'next/link';
import styles from './layout.module.css';

// Variables kept for re-use
const placeholder = 'placeholder';
export const siteTitle = 'AIChef';

export default function Layout({ children, home }) {
    return (
        <div>
            <div className={styles.navbar}>
                <nav>
                    <h1>AIChef</h1>
                    <Link href="/">Home 🏠</Link>
                    <Link href="https://github.com/lekkasgit/aichef">GitHub 🔌</Link>
                    <Link href="chat/stream">Stream 🌊</Link>
                </nav>
            </div>

            <div>{children}</div>
        </div>
    );
};