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
import styles from '../../styles/components/layout.module.css';

import { openConsole } from '../../functions/console';

// Variables kept for re-use
const placeholder = 'placeholder';
export const siteTitle = 'AIChef';

export default function Layout({ children, home }) {
    return (

        <div>

            <div className={styles.navbar}>

                <nav>
                    <h1>AIChef</h1>
                    <Link legacyBehavior href="/"><a className="btn btn-primary text-white">Home 🏠</a></Link>
                    <Link legacyBehavior href="chat"><a className="btn btn-primary text-white">Chat 💬</a></Link>
                    <Link legacyBehavior href="https://github.com/lekkasgit/aichef"><a href="https://github.com/lekkasgit/aichef" className="btn btn-secondary text-white">GitHub 🔌</a></Link>
                    <left>👨‍🍳 OpenAI powered recipe and image generation</left>
                </nav>

            </div>

            <div>{children}</div>
            <div className={styles.footer}>
  <p className={styles.footerText}>&copy; Alexandros Lekkas 2023</p>
  <p className={styles.footerText}>Developed during an efood internship</p>
</div>


        </div>
    );
};