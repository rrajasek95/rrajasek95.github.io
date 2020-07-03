---
# Feel free to add content and custom Front Matter to this file.
# To modify the layout, see https://jekyllrb.com/docs/themes/#overriding-theme-defaults
layout: landing
title: Home
---

<section id="about" class="about-area pt-125 pb-130">
    <div class="container">
        <div class="row justify-content-center">
            <div class="col-lg-8">
                <div class="section-title text-center">
                    <h2 class="title">Rishi Rajasekaran</h2>
                </div> <!-- section title -->
            </div>
        </div> <!-- row -->
        <div class="row">
            <div class="col-lg-3">
                <img src="/assets/img/me_circle.jpg" />
            </div>
            <div class="col-lg-8">
                <div class="about-content mt-50">
                    <h5 class="about-title">About Me</h5>
                    <p>Hi, I'm Rishi! I am a 1st year MS in CSE student at UC Santa Cruz. My current areas of interest are in Natural Language Processing, with a focus on dialogue systems and machine learning under the supervision of <a href="https://users.soe.ucsc.edu/~maw/">Prof. Marilyn Walker</a>.</p>
                    <p>
                        Some key problems I am currently studying are how generative language models can be controlled to produce specific kinds of outputs, improving models for creating language understanding features such as for dialog act tagging and also how to better evaluate dialog. I was a member of the official UC Santa Cruz team that is a <a href="https://news.ucsc.edu/2020/05/alexa-challenge.html">finalist</a> in the <a href="https://developer.amazon.com/alexaprize">3rd Amazon Alexa Prize Challenge</a>. Some of the key tasks I worked on as part of the team were improving the natural language understanding components, writing response generators and also assessing pretrained models for ranking responses.
                    </p>
                    <p>I'm a native of Chennai, one of the many temple cities in India, where I spent the whole of my childhood. </p>
                    <p>I did my bachelor's degree in Computer Science and Engineering from NIT Trichy in Tamil Nadu. I spent a huge chunk of time over there participating in quizzes, web development and getting cooked in the heat! I was a member of <a href="https://spider.nitt.edu/">Spider R&D</a>, a technology club, and <a href="https://www.facebook.com/ballsbypicasso/">Balls by Picasso</a>, the English Literary Club. As a member of Spider R&D, I worked on several campus administration projects including the groundwork for the current iteration of the <a href="https://mess.nitt.edu/">college dining hall site</a>, which we in NIT Trichy refer to as the mess site.</p>
                    <p>I joined Morgan Stanley in 2017 where I worked as a Java developer for the Wealth Management Division. My work involved building backend systems for account creation and client onboarding. For more description of my work, refer to my <a href="https://drive.google.com/file/d/1SNHW-TjxWogLxxjldp89zO_kb0EzK8v1/view?usp=sharing">resume</a>. </p>
                    <ul class="clearfix">
                        <li>
                            <div class="single-info d-flex align-items-center">
                                <div class="info-icon">
                                    <i class="lni-envelope"></i>
                                </div>
                                <div class="info-text">
                                    <p><span>Academic Email:</span> rrajasek [AT] ucsc [DOT] edu</p>
                                </div>
                            </div> <!-- single info -->
                        </li>
                        <li>
                            <div class="single-info d-flex align-items-center">
                                <div class="info-icon">
                                    <i class="lni-envelope"></i>
                                </div>
                                <div class="info-text">
                                    <p><span>Personal Email:</span> rajasekaran [DOT] rishi [AT] gmail [DOT] com</p>
                                </div>
                            </div> <!-- single info -->
                        </li>
                        <li>
                            <div class="single-info d-flex align-items-center">
                                <div class="info-icon">
                                    <i class="lni-map-marker"></i>
                                </div>
                                <div class="info-text">
                                    <p><span>Location:</span> Santa Cruz, CA</p>
                                </div>
                            </div> <!-- single info -->
                        </li>
                        <li>
                            <div class="single-info d-flex align-items-center">
                                <div class="info-icon">
                                    <i class="lni-twitter"></i>
                                </div>
                                <div class="info-text">
                                    <p><span>Twitter:</span> <a href="https://twitter.com/{{ site.twitter_username }}">{{ site.twitter_username }}</a></p>
                                </div>
                            </div>
                        </li>
                        <li>
                            <div class="single-info d-flex align-items-center">
                                    <div class="info-icon">
                                            <i class="lni-github"></i>
                                        </div>
                                        <div class="info-text">
                                            <p><span>GitHub:</span> <a href="https://github.com/{{ site.github_username }}">{{ site.github_username }}</a></p>
                                        </div>
                            </div>
                        </li>
                        <li>
                            <div class="single-info d-flex align-items-center">
                                    <div class="info-icon">
                                        <i class="lni-certificate"></i>
                                    </div>
                                    <div class="info-text">
                                        <p><span>Resume:</span> 
                                        <a name="resume" href="https://drive.google.com/file/d/1SNHW-TjxWogLxxjldp89zO_kb0EzK8v1/view?usp=sharing">View</a></p>
                                    </div>
                            </div>
                        </li>
                    </ul>
                </div> <!-- about content -->
            </div>
        </div>
    </div>
</section>
<section id="papers" class=" services-area gray-bg pt-125 pb-130">
    <div class="container">
        <div class="row justify-content-center">
            <div class="col-lg-8">
                <div class="section-title text-center pb-30">
                    <h2 class="title">Papers I Find Very Interesting</h2>
                </div>
            </div>
        </div>
        <div class="row justify-content-center">
            <div class="col-lg-4 col-md-6 col-sm-8">
                <div class="single-service text-center mt-30">
                    <div class="service-content">
                        <h4 class="service-title"><a href="https://arxiv.org/pdf/1609.01454.pdf">Attention-Based Recurrent Neural Network Models for Joint Intent Detection and Slot Filling</a></h4>
                        <p>Bing Liu, Ian Lane</p>
                    </div>
                </div>
            </div>
            <div class="col-lg-4 col-md-6 col-sm-8">
                <div class="single-service text-center mt-30">
                    <div class="service-content">
                        <h4 class="service-title"><a href="https://www.csie.ntu.edu.tw/~yvchen/doc/IS16_MultiJoint.pdf">Multi-Domain Joint Semantic Frame Parsing using Bi-directional RNN-LSTM</a></h4>
                        <p>Dilek Hakkani-Tür, Gokhan Tur, Asli Celikyilmaz, Yun-Nung Chen,Jianfeng Gao, Li Deng, and Ye-Yi Wang</p>
                    </div>
                </div>
            </div>
            <div class="col-lg-4 col-md-6 col-sm-8">
                <div class="single-service text-center mt-30">
                    <div class="service-content">
                        <h4 class="service-title"><a href="https://arxiv.org/pdf/1508.07909.pdf">Neural Machine Translation of Rare Words with Subword Units</a></h4>
                        <p>Rico Sennrich, Barry Haddow and Alexandra Birch</p>
                    </div>
                </div>
            </div>
        </div>
    </div>
</section>