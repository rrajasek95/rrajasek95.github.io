import React from 'react';
// import { Link } from 'react-router-dom';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Image from 'react-bootstrap/Image';
import Carousel from 'react-bootstrap/Carousel';

import Main from '../layouts/Main';

import me from '../assets/img/me_cropped.jpg';

const Index = () => (
  <Main
    description={"Rishi Rajasekaran's Personal Website"}
  >
    <Container>
      <Row>
        <Col md={3}>
          <Row>
            <Image src={me} roundedCircle alt="Photo of Rishi captured at the 17-mile drive" fluid/>
          </Row>
          <br />
          <Row>
            <h2>Rishi Rajasekaran</h2>
          </Row>
          <Row>
            <Col><strong>GitHub</strong> <a href="https://github.com/rrajasek95">rrajasek95</a></Col>
          </Row>
          <Row>
            <Col><strong>Resume</strong> <a href="https://drive.google.com/file/d/1SNHW-TjxWogLxxjldp89zO_kb0EzK8v1/view">View</a></Col>
          </Row>
          <Row>
            <Col><strong>Twitter</strong> <a href="https://twitter.com/rishrajasek">rishrajasek</a></Col>
          </Row>
        </Col>
        <Col md={6}>
          <h3>About Me</h3>
          <h4>Professional Experience</h4>
          <strong>Walmart Global Tech</strong>, <em>Data Scientist - eCommerce Personalization</em>
          <p>
          I am a Data Scientist at Walmart Global Tech working with the Personalization (P13N) org. My primary role is to
          apply Big Data and Machine Learning techniques to support the Walmart.com homepage experience. I currently develop 
          and maintain pipelines and models for item recommendations and customer segmentation.
          </p>

          <strong>Morgan Stanley</strong>, <em>Senior Associate - Wealth Management</em>
          <p>
            I worked as a Software Engineer in the New Account Opening team. I worked as a backend engineer working on 
            systems and libraries to support a variety of account opening workflows. 
          </p>

          <h4>Education </h4>
          <strong>UC Santa Cruz</strong>, <em>MS in Computer Science and Engineering</em>
          <p>
            I completed my MS in Computer Science and Engineering from UC Santa Cruz with a focus on applying 
            deep learning for conditional text generation for dialogue systems. I also participated in the Amazon Alexa Prize
            Socialbot Challenge under the aegis of my advisor <a href="https://users.soe.ucsc.edu/~maw/">Prof. Marilyn Walker</a>. I got an opportunity to work on several interesting research problems as a part of the challenge - Dialogue Act Classification, Response Generation, Learning-to-Rank, Pretrained Transformers. More information can be found in our <a href="https://arxiv.org/abs/2011.10683">technical report</a>.
          </p>

          <h4>Miscellania</h4>
          <h5>Photography</h5>
          <p>
            I'm wildly passionate about nature and still-life photography. Here are a small selection of photos that I've taken from various places that I've lived in/visited.
          </p>
          
          <Carousel>
            <Carousel.Item>
              <Image src="https://lh3.googleusercontent.com/CbYJ6Qt9sdVKdqLc1mnSSEeBdtTWY9p7uyXJYBuEX_8wpQDvv-7Nxu8v8_4M2VAO9vSGTtFZixrCBPVIjkWdWZJCo7nkGbC_YUZtYkcFDMtSMFXRigcfRvbtGoEeoSb7rDaGYupBQUo=w600-h315-p-k" fluid/>
              <Carousel.Caption>
                Carmel-by-the-Sea
              </Carousel.Caption>
            </Carousel.Item>
            <Carousel.Item>
              <Image src="https://lh3.googleusercontent.com/ok3DmZ0PtLujr5_CQSorWRCslRIEEfiWTc7HDkoVVkVI_k7nx9oHNXVNp6D9CzzhFy5qrJU7gPt16Hk853vtagh_MguwzjUK0XcSgUNU0a2KdDzppbKU13gTS5Kiv6ZEy7C64OMg_7A=w600-h315-p-k" fluid/>
              <Carousel.Caption>
                Sunset at Bixby Creek
              </Carousel.Caption>
            </Carousel.Item>
            <Carousel.Item>
              <Image src="https://lh3.googleusercontent.com/WOmxiZn0Yz6BXr8zaeacJykvyTUD0Qd9hPXyCWLCm-5miEc4-khmHr0gAJxcWDCiF9SUI_5Ob7WN47P5bWibn-4ed3x6iTt5tD0464i03snTyzdbf_MzAcPyIcTdLqCiVTGjU7clQFE=w600-h315-p-k" fluid/>
              <Carousel.Caption>
                Sunset in Santa Cruz
              </Carousel.Caption>
            </Carousel.Item>
            <Carousel.Item>
              <Image src="https://lh3.googleusercontent.com/K1qt_Kq6Ijkvw9gIVo5nDxej6I8vkzSNneJOV4tOCpdIswwfuTbynJvrVrwUnVmwT67gUBp5_JiCsXsN7AbMTtQ9Q8EnCFjgaVLPwn38lW02Kw9mwNJzzIe11D3l6jMaUGr-f56id7Y=w600-h315-p-k" fluid/>
              <Carousel.Caption>
                Crescent Lake, Olympic National Park
              </Carousel.Caption>
            </Carousel.Item>
            <Carousel.Item>
              <Image src="https://lh3.googleusercontent.com/bixMtJidImlmxpyYaY1Vm13AmLiflI7UeV-FticxigLn6ZjcksH_mJC1DkMP6x4LObI9Hk_0k_4Q3chddAFcO40_fLZw5zt1WiQt8SILIIOv-J_DZXj-nvEzFJF_ZgB2veuu8wXky2Y=w600-h315-p-k" fluid/>
              <Carousel.Caption>
                Black Mountain, Los Altos
              </Carousel.Caption>
            </Carousel.Item>
          </Carousel>
        </Col>
      </Row>
    </Container>
  </Main>
);

export default Index;
