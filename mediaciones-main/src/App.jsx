import Header from './components/Header';
import HeroLawhere from './components/HeroLawhere';
import QuienesSomos from './components/QuienesSomos';
import Mediacion from './components/Mediacion';
import Servicios from './components/Servicios';
import Testimonials from './components/Testimonials';
import Contact from './components/Contact';
import Footer from './components/Footer';
import './index.css';

export default function App() {
  return (
    <>
      <Header />
      <main>
        <HeroLawhere />
        <QuienesSomos />
        <Mediacion />
        <Servicios />
        <Testimonials />
        <Contact />
        <Footer />
      </main>
    </>
  );
}
