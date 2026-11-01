'use client';

import Image from 'next/image';
import { useState } from 'react';
import { AnimatePresence, motion, useReducedMotion } from 'framer-motion';

type Product = { id: string; name: string; price: number; image: string; description: string; stock: number; sizes: string[]; tag: string };
const products: Product[] = [
  { id: 'limited-tee', name: 'Limited Edition Logo Tee', price: 33000, image: '/products/limited-edition-logo-tee.jpg', description: 'A white tee with a minimal front mark and ticket-inspired back graphic.', stock: 5, sizes: ['S', 'M', 'L', 'XL'], tag: 'LIMITED EDITION' },
  { id: 'ringer-tee', name: 'Ringer Graphic Tee', price: 35000, image: '/products/ringer-graphic-tee.jpg', description: 'A contrast-trim tee with a planetary chest graphic and bold back print.', stock: 8, sizes: ['S', 'M', 'L', 'XL'], tag: 'NEW ARRIVAL' },
];
type CartLine = { product: Product; size: string; qty: number };
const money = (n: number) => new Intl.NumberFormat('en-NG', { style: 'currency', currency: 'NGN', maximumFractionDigits: 0 }).format(n);

export default function Home() {
  const reduceMotion = useReducedMotion();
  const [cart, setCart] = useState<CartLine[]>([]);
  const [selected, setSelected] = useState<Product | null>(null);
  const [size, setSize] = useState('M');
  const [bagOpen, setBagOpen] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [notice, setNotice] = useState('');
  const totalItems = cart.reduce((sum, line) => sum + line.qty, 0);
  const subtotal = cart.reduce((sum, line) => sum + line.product.price * line.qty, 0);
  const enter = reduceMotion ? {} : { initial: { opacity: 0, y: 22 }, whileInView: { opacity: 1, y: 0 }, viewport: { once: true, amount: 0.15 }, transition: { duration: 0.65, ease: 'easeOut' as const } };

  function addToCart(product: Product, chosenSize: string) {
    const existing = cart.find(line => line.product.id === product.id && line.size === chosenSize);
    const currentQty = existing?.qty ?? 0;
    if (currentQty >= product.stock) { setNotice('That size has reached the available stock quantity.'); return; }
    setCart(prev => existing ? prev.map(line => line.product.id === product.id && line.size === chosenSize ? { ...line, qty: line.qty + 1 } : line) : [...prev, { product, size: chosenSize, qty: 1 }]);
    setNotice(`${product.name} · size ${chosenSize} added to bag`);
    setSelected(null);
    setBagOpen(true);
  }
  function changeQty(id: string, chosenSize: string, delta: number) {
    setCart(prev => prev.flatMap(line => {
      if (line.product.id !== id || line.size !== chosenSize) return [line];
      const qty = Math.min(line.product.stock, line.qty + delta);
      return qty <= 0 ? [] : [{ ...line, qty }];
    }));
  }

  return <main>
    <div className="announcement">INDEPENDENT STREETWEAR · LAGOS, NIGERIA</div>
    <header className="nav">
      <button className="menu-toggle" aria-label={menuOpen ? 'Close navigation' : 'Open navigation'} aria-expanded={menuOpen} onClick={() => setMenuOpen(!menuOpen)}>{menuOpen ? 'CLOSE' : 'MENU'}</button>
      <a className="wordmark" href="#top" aria-label="DRMHUS ORGNLS home">DRMHUS <span>ORGNLS.</span></a>
      <nav className={menuOpen ? 'nav-links nav-links-open' : 'nav-links'}>
        <a href="#shop" onClick={() => setMenuOpen(false)}>SHOP</a><a href="#story" onClick={() => setMenuOpen(false)}>OUR STORY</a><a href="#newsletter" onClick={() => setMenuOpen(false)}>UPDATES</a>
      </nav>
      <button className="bag-button" onClick={() => setBagOpen(true)}>BAG <span>({totalItems})</span></button>
    </header>

    <section className="hero" id="top">
      <div className="hero-copy">
        <motion.p className="eyebrow" initial={reduceMotion ? false : { opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.7 }}>WEAR IT. OWN IT. BECOME IT.</motion.p>
        <motion.h1 initial={reduceMotion ? false : { opacity: 0, y: 26 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8, delay: 0.1 }}>BUILT<br/><em>DIFFERENT.</em></motion.h1>
        <motion.div className="hero-bottom" initial={reduceMotion ? false : { opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.65, delay: 0.35 }}>
          <p>A new standard for everyday wear.<br/>Made to move with your own direction.</p><a className="circle-link" href="#shop" aria-label="Explore collection">↘</a>
        </motion.div>
      </div>
      <div className="hero-image-wrap">
        <div className="hero-image"><Image src="/campaign/hero-couple.jpg" alt="DRMHUS ORGNLS campaign models wearing the collection" fill priority sizes="100vw" style={{ objectFit: 'cover', objectPosition: 'center 38%' }} /></div>
        <span className="image-index">DRMHUS ORGNLS. — 001</span>
      </div>
      <div className="hero-stamp">ORIGINAL<br/>BY DESIGN</div>
    </section>

    <section className="ticker" aria-label="Brand statement"><div>WEAR IT. OWN IT. BECOME IT. <span>✳</span> NO SHORTCUTS <span>✳</span> NO COPY / PASTE <span>✳</span> OWN YOUR DIRECTION <span>✳</span> NO SHORTCUTS <span>✳</span> NO COPY / PASTE <span>✳</span></div></section>

    <section className="campaign-editorial" aria-label="DRMHUS campaign imagery">
      <motion.div className="campaign-intro" {...enter}>
        <p className="eyebrow">THE DRMHUS POINT OF VIEW</p>
        <h2>MADE FOR<br/><em>THE EVERYDAY.</em></h2>
        <p>Wear the future. Live forever.</p>
      </motion.div>
      <motion.figure className="campaign-feature" {...enter}>
        <Image src="/campaign/campaign-poster.jpg" alt="DRMHUS campaign portrait and brand statement" fill sizes="(max-width: 760px) 100vw, 56vw" style={{objectFit:'cover', objectPosition:'center 35%'}} />
        <figcaption>CAMPAIGN 001 / A NEW STANDARD</figcaption>
      </motion.figure>
      <div className="campaign-pair">
        <motion.figure {...enter}><Image src="/campaign/campaign-shutter.jpg" alt="DRMHUS models wearing branded tees" fill sizes="(max-width: 760px) 100vw, 45vw" style={{objectFit:'cover'}}/><figcaption>THE ORIGINALS / 001</figcaption></motion.figure>
        <motion.figure {...enter} transition={reduceMotion ? undefined : {duration:0.8, delay:0.12}}><Image src="/campaign/campaign-rooftop.jpg" alt="DRMHUS streetwear campaign group portrait" fill sizes="(max-width: 760px) 100vw, 45vw" style={{objectFit:'cover'}}/><figcaption>OWN YOUR DIRECTION</figcaption></motion.figure>
      </div>
    </section>

    <section className="shop-section section-pad" id="shop">
      <motion.div className="section-heading" {...enter}><div><p className="eyebrow">THE FIRST DROP</p><h2>START HERE<span>.</span></h2></div><p className="section-note">Two pieces. One point of view.<br/>Designed to move with you.</p></motion.div>
      <div className="product-grid">
        {products.map((product, i) => <motion.article className="product-card" key={product.id} {...enter} transition={reduceMotion ? undefined : { duration: 0.6, delay: i * 0.12 }}>
          <button className="product-image-button" onClick={() => { setSelected(product); setSize('M'); }} aria-label={`View ${product.name}`}>
            <div className="product-image"><Image src={product.image} alt={`${product.name}, front and back product views`} fill sizes="(max-width: 700px) 100vw, 50vw" style={{ objectFit: 'cover' }} /><span className="product-tag">{product.tag}</span><span className="quick-view">QUICK VIEW ↗</span></div>
          </button>
          <div className="product-info"><div><h3>{product.name}</h3><p>{product.stock} available · Sizes S–XL</p></div><strong>{money(product.price)}</strong></div>
          <button className="add-button" onClick={() => { setSelected(product); setSize('M'); }}>SELECT SIZE <span>+</span></button>
        </motion.article>)}
      </div>
    </section>

    <section className="manifesto" id="story"><motion.div {...enter} className="manifesto-inner"><p className="eyebrow">A LITTLE ABOUT US</p><h2>NOT MADE TO<br/>FIT IN. <em>MADE TO<br/>BE YOURS.</em></h2><div className="manifesto-foot"><p>DRMHUS ORGNLS. is about personal expression through everyday uniform. The details speak. You decide what they say.</p><span>INDEPENDENT BY NATURE.</span></div></motion.div></section>

    <section className="newsletter section-pad" id="newsletter"><motion.div {...enter}><p className="eyebrow">STAY IN THE LOOP</p><h2>THE NEXT DROP<br/>WON&apos;T WAIT<span>.</span></h2><p className="newsletter-note">New releases, restocks and brand updates. Straight to your inbox.</p><form onSubmit={e => { e.preventDefault(); setNotice('Newsletter signup is a design preview. Email collection will be connected before launch.'); }} className="newsletter-form"><label className="sr-only" htmlFor="email">Email address</label><input id="email" type="email" required placeholder="YOUR EMAIL ADDRESS"/><button type="submit">SIGN ME UP ↗</button></form><small>By signing up, you agree to receive updates from DRMHUS ORGNLS.</small></motion.div></section>

    <footer className="footer"><a className="wordmark footer-mark" href="#top">DRMHUS <span>ORGNLS.</span></a><p>INDEPENDENT STREETWEAR · NIGERIA</p><div><a href="#shop">SHOP</a><a href="#story">OUR STORY</a><a href="mailto:hello@drmhus.example">CONTACT</a></div><small>© {new Date().getFullYear()} DRMHUS ORGNLS. ALL RIGHTS RESERVED.</small></footer>

    <div className="mobile-action-bar" aria-label="Quick shopping actions"><a href="#shop" onClick={() => setMenuOpen(false)}>SHOP THE DROP <span>↗</span></a><button onClick={() => setBagOpen(true)}>BAG <span>({totalItems})</span></button></div>

    <AnimatePresence>{selected && <motion.div className="overlay" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} onClick={() => setSelected(null)}><motion.div className="detail-panel" initial={reduceMotion ? false : { x: 40, opacity: 0 }} animate={{ x: 0, opacity: 1 }} exit={{ x: 40, opacity: 0 }} onClick={e => e.stopPropagation()}><button className="close-button" onClick={() => setSelected(null)} aria-label="Close product details">×</button><div className="detail-image"><Image src={selected.image} alt={`${selected.name} front and back`} fill sizes="(max-width: 700px) 100vw, 45vw" style={{ objectFit: 'cover' }}/></div><div className="detail-copy"><p className="eyebrow">{selected.tag}</p><h2>{selected.name}</h2><strong className="detail-price">{money(selected.price)}</strong><p>{selected.description}</p><p className="field-label">SELECT SIZE</p><div className="size-options">{selected.sizes.map(s => <button key={s} className={size === s ? 'size-option size-active' : 'size-option'} onClick={() => setSize(s)}>{s}</button>)}</div><p className="stock-note">{selected.stock} units available across listed sizes. Exact per-size stock is not yet configured.</p><button className="primary-button" onClick={() => addToCart(selected, size)}>ADD TO BAG — {money(selected.price)}</button></div></motion.div></motion.div>}</AnimatePresence>

    <AnimatePresence>{bagOpen && <motion.div className="overlay bag-overlay" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} onClick={() => setBagOpen(false)}><motion.aside className="bag-panel" initial={reduceMotion ? false : { x: 80 }} animate={{ x: 0 }} exit={{ x: 80 }} onClick={e => e.stopPropagation()}><div className="bag-head"><div><p className="eyebrow">YOUR SELECTION</p><h2>YOUR BAG ({totalItems})</h2></div><button className="close-button" onClick={() => setBagOpen(false)} aria-label="Close bag">×</button></div>{cart.length === 0 ? <div className="empty-bag"><p>Nothing here yet.</p><button className="primary-button" onClick={() => setBagOpen(false)}>BACK TO SHOP</button></div> : <><div className="bag-lines">{cart.map(line => <div className="bag-line" key={`${line.product.id}-${line.size}`}><div className="bag-thumb"><Image src={line.product.image} alt="" fill sizes="90px" style={{ objectFit: 'cover' }}/></div><div className="bag-line-info"><strong>{line.product.name}</strong><span>SIZE: {line.size}</span><span>{money(line.product.price)}</span><div className="qty-control"><button onClick={() => changeQty(line.product.id, line.size, -1)} aria-label="Decrease quantity">−</button><span>{line.qty}</span><button onClick={() => changeQty(line.product.id, line.size, 1)} aria-label="Increase quantity">+</button></div></div></div>)}</div><div className="bag-total"><div><span>SUBTOTAL</span><strong>{money(subtotal)}</strong></div><p>Shipping and any applicable discounts are calculated at checkout.</p><button className="primary-button" onClick={() => setNotice('Checkout is not connected yet. Paystack and delivery calculation will be configured before launch.')}>CONTINUE TO CHECKOUT ↗</button></div></>}</motion.aside></motion.div>}</AnimatePresence>
    <AnimatePresence>{notice && <motion.div className="toast" initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: 12 }} role="status">{notice}<button onClick={() => setNotice('')} aria-label="Dismiss notification">×</button></motion.div>}</AnimatePresence>
  </main>;
}
