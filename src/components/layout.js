import React from 'react';

import 'bootstrap/dist/css/bootstrap.min.css';

import './css/LineIcons.css';
import './css/magnific-popup.css';
import './css/default.css';
import './css/style.css';
import './css/custom.css';
import './css/syntax.css'

import 'popper.js';
import 'jquery';

import { Link } from "gatsby";
import SEO from './seo';

const Header = () => {
    return (
        <header id="home" className="header-area">
            <div className="navigation fixed-top sticky">
                <div className="container">
                    <div className="row">
                        <div className="col-lg-12">
                            <nav className="navbar navbar-expand-lg">
                                <div className="collapse navbar-collapse">
                                    <ul className="navbar-nav ml-auto">
                                        <li className="nav-item">
                                            <Link to="/">About</Link>
                                        </li>
                                        <li className="nav-item">
                                            <Link to="/blog">Posts</Link>
                                        </li>
                                    </ul>
                                </div>
                            </nav>
                        </div>
                    </div>
                </div>
            </div>
        </header>
    );
}

const Footer = () => {
    return (
    <footer id="footer" className="footer-area">
        <div className="footer-copyright pb-20">
            <div className="container">
                <div className="row">
                    <div className="col-lg-12">
                        <div className="copyright-text text-center pt-20">
                            <p>Adapted from the <a href="https://uideck.com/templates/unfold-free-personal-portfolio-and-profile-template/" rel=   "nofollow">Unfold</a> template created by <a href="https://uideck.com" rel="nofollow">UIdeck</a> (free for personal use). Site configured using <a href="https://www.gatsbyjs.org/">Gatsby</a></p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </footer>
    );
}

export default function Layout({ children }) {
    return (
            <div>
                <SEO />
                <Header />
                { children }
                <Footer />
            </div>
    );
}