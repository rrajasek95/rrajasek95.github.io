import React from "react"
import Layout from '../components/layout';

import MeImage from '../assets/img/me_circle.jpg';

function InfoItem({description, value, iconClass}) {
  return (
    <li>
        <div className="single-info d-flex align-items-center">
            <div className="info-icon">
                <i className={iconClass}></i>
            </div>
            <div className="info-text">
                <p><span>{description}:</span> {value}</p>
            </div>
        </div>
    </li>
  )
}

function TwitterUrl() {
  return (
    <a href="https://twitter.com/rishrajasek">rishrajasek</a>
  );
}

function GitHubUrl() {
  return (<a href="https://github.com/rrajasek95">rrajasek95</a>)
}

function ResumeUrl() {
  return (<a name="resume" href="https://drive.google.com/file/d/1SNHW-TjxWogLxxjldp89zO_kb0EzK8v1/view?usp=sharing">View</a>);
}

function InfoList() {
  return (
    <ul>
      <InfoItem iconClass="lni-envelope" description="Academic Email" value="rrajasek [AT] ucsc [DOT] edu" />
      <InfoItem iconClass="lni-envelope" description="Personal Email" value="rajasekaran [DOT] rishi [AT] gmail [DOT] com" />
      <InfoItem iconClass="lni-map-marker" description="Location" value="Santa Cruz, CA" />
      <InfoItem iconClass="lni-twitter" description="Twitter" value={TwitterUrl()} />
      <InfoItem iconClass="lni-github" description="GitHub" value={GitHubUrl()} />
      <InfoItem iconClass="lni-certificate" description="Resume" value={ResumeUrl()} />
    </ul>
  );
}



export default function Home() {
  return (
    <Layout>
      <section id="about" className="about-area pt-125 pb-130">
          <div className="container">
              <div className="row justify-content-center">
                  <div className="col-lg-8">
                      <div className="section-title text-center">
                          <h2 className="title">Rishi Rajasekaran</h2>
                      </div>
                  </div>
              </div>
              <div className="row">
                  <div className="col-lg-3">
                      <img src={MeImage} alt="Me at the San Francisco Ghirardelli"/>
                  </div>
                  <div className="col-lg-9">
                      <div className="about-content mt-50">
                          <h5 className="about-title">About Me</h5>
                          <p>Hi, I'm Rishi! I am a 1st year MS in CSE student at UC Santa Cruz. My current areas of interest are in Natural Language Processing, with a focus on dialogue systems and machine learning under the supervision of <a href="https://users.soe.ucsc.edu/~maw/">Prof. Marilyn Walker</a>.</p>
                          <p>
                              Some key problems I am currently studying are how generative language models can be controlled to produce specific kinds of outputs, improving models for creating language understanding features such as for dialog act tagging and also how to better evaluate dialog. I was a member of the official UC Santa Cruz team that is a <a href="https://news.ucsc.edu/2020/05/alexa-challenge.html">finalist</a> in the <a href="https://developer.amazon.com/alexaprize">3rd Amazon Alexa Prize Challenge</a>. Some of the key tasks I worked on as part of the team were improving the natural language understanding components, writing response generators and also assessing pretrained models for ranking responses.
                          </p>
                          <p>I'm a native of Chennai, one of the many temple cities in India, where I spent the whole of my childhood. </p>
                          <p>I did my bachelor's degree in Computer Science and Engineering from NIT Trichy in Tamil Nadu. I spent a huge chunk of time over there participating in quizzes, web development and getting cooked in the heat! I was a member of <a href="https://spider.nitt.edu/">Spider R&D</a>, a technology club, and <a href="https://www.facebook.com/ballsbypicasso/">Balls by Picasso</a>, the English Literary Club. As a member of Spider R&D, I worked on several campus administration projects including the groundwork for the current iteration of the <a href="https://mess.nitt.edu/">college dining hall site</a>, which we in NIT Trichy refer to as the mess site.</p>
                          <p>I joined Morgan Stanley in 2017 where I worked as a Java developer for the Wealth Management Division. My work involved building backend systems for account creation and client onboarding. For more description of my work, refer to my <a href="https://drive.google.com/file/d/1SNHW-TjxWogLxxjldp89zO_kb0EzK8v1/view?usp=sharing">resume</a>. </p>
                          <InfoList />
                      </div>
                  </div>
              </div>
          </div>
      </section>
      <section id="papers" className=" services-area gray-bg pt-125 pb-130">
          <div className="container">
              <div className="row justify-content-center">
                  <div className="col-lg-8">
                      <div className="section-title text-center pb-30">
                          <h2 className="title">Papers I Find Very Interesting</h2>
                      </div>
                  </div>
              </div>
              <div className="row justify-content-center">
                  <div className="col-lg-4 col-md-6 col-sm-8">
                      <div className="single-service text-center mt-30">
                          <div className="service-content">
                              <h4 className="service-title"><a href="https://arxiv.org/pdf/1609.01454.pdf">Attention-Based Recurrent Neural Network Models for Joint Intent Detection and Slot Filling</a></h4>
                              <p>Bing Liu, Ian Lane</p>
                          </div>
                      </div>
                  </div>
                  <div className="col-lg-4 col-md-6 col-sm-8">
                      <div className="single-service text-center mt-30">
                          <div className="service-content">
                              <h4 className="service-title"><a href="https://www.csie.ntu.edu.tw/~yvchen/doc/IS16_MultiJoint.pdf">Multi-Domain Joint Semantic Frame Parsing using Bi-directional RNN-LSTM</a></h4>
                              <p>Dilek Hakkani-Tür, Gokhan Tur, Asli Celikyilmaz, Yun-Nung Chen,Jianfeng Gao, Li Deng, and Ye-Yi Wang</p>
                          </div>
                      </div>
                  </div>
                  <div className="col-lg-4 col-md-6 col-sm-8">
                      <div className="single-service text-center mt-30">
                          <div className="service-content">
                              <h4 className="service-title"><a href="https://arxiv.org/pdf/1508.07909.pdf">Neural Machine Translation of Rare Words with Subword Units</a></h4>
                              <p>Rico Sennrich, Barry Haddow and Alexandra Birch</p>
                          </div>
                      </div>
                  </div>
              </div>
          </div>
      </section>
    </Layout>
  )
}
