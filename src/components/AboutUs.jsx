import { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useInView } from 'react-intersection-observer';
import './AboutUs.css';

const AboutUs = () => {
    // Observadores de Intersección para animaciones
    const [introRef, introInView] = useInView({ threshold: 0.1, triggerOnce: true });
    const [milagrosRef, milagrosInView] = useInView({ threshold: 0.3, triggerOnce: true });
    const [philosophyRef, philosophyInView] = useInView({ threshold: 0.2, triggerOnce: true });
    const [creativeRef, creativeInView] = useInView({ threshold: 0.2, triggerOnce: true });
    const [lifewearRef, lifewearInView] = useInView({ threshold: 0.2, triggerOnce: true });

    useEffect(() => {
        window.scrollTo(0, 0); // Vuelve al inicio de la página al montarse
    }, []);

    return (
        <div className="aboutus-container">
            {/* 1. Experiencia de Entrada: La Bienvenida */}
            <section className="aboutus-hero-section">
                <div className={`aboutus-hero-text ${introInView ? 'is-in-view' : ''}`} ref={introRef}>
                    <p>Bienvenid@ a un universo donde vestir es mucho más que cubrir el cuerpo: es una forma profunda de habitar el mundo.</p>
                    <p>Refugio nació con el deseo inmencho de imaginar otra manera de estar: una que fuera más humana, más lenta, más sensible. Cada prenda, cada objeto que creamos, busca acompañarte como un gesto de cuidado, como un espacio donde el alma pueda volver a respirar.</p>
                    <p>No creemos en modas pasajeras, sino en la atemporalidad. En Refugio, trascendemos el lujo del exceso para celebrar el verdadero lujo de lo que perdura: lo hecho a mano, lo ético, lo que lleva un alma. Entendemos el acto de refugiarse no como esconderse, sino como elegir con profunda conciencia desde dónde y cómo queremos estar en el mundo. Queremos que cada cápsula, cada textil, cada historia que compartimos sea un puente tangible entre tu cuerpo, la tierra y el tiempo.</p>
                </div>
            </section>

            {/* 2. El Ancla: Tu Voz, Tu Origen */}
            <section className={`milagros-section ${milagrosInView ? 'is-in-view' : ''}`} ref={milagrosRef}>
                <div className="milagros__image-container">
                    <img src="/images/Milagros.svg" alt="Milagros Salvatierra, Fundadora y Directora Creativa de Refugio." />
                </div>
                <div className="milagros__text-container">
                    <h2 className="milagros__greeting">Hola, soy Milagros Salvatierra,</h2>
                    <p>Fundadora y Directora Creativa de Refugio. Este proyecto surge como un acto de búsqueda personal y un firme desafío a una industria de la moda que a menudo diluye la individualidad en la producción en serie. Desde mi visión como diseñadora, siempre quise ir más allá de la prenda, creando un universo donde lo que vestimos sea un puente tangible hacia un estilo de vida más consciente. Por eso, Refugio no es solo una marca; integra productos, servicios y experiencias diseñadas para acompañar tu propósito y bienestar. Por mucho tiempo, sentí la necesidad imperante de un lugar donde el diseño encontrara su propósito en lo esencial, elevándose por encima de lo efímero, convencida de que la lentitud no es sinónimo de despacio, sino de una profunda forma de habitar.</p>
                    <p>Mi inspiración se nutre de los patrimonios naturales y culturales que nos atraviesan, de la inmensidad de los paisajes que nos ofrecen cobijo, de las memorias intrínsecas en las tradiciones textiles y del amor por lo artesanal que se manifiesta en cada puntada. Refugio nace de esa convicción profunda: la certeza de que vestirnos también puede ser un gesto de libertad, de belleza y de cuidado consciente.</p>
                    <p>Para mí, la vida es un ritual, y cada pieza de Refugio es un espacio de introspección, similar a un refugio de montaña. Un lugar donde podemos hacer una pausa significativa, respirar hondo y recargar las energías para continuar la aventura de la vida con propósito y consciencia. El ritual aquí es una decisión: mirar con amor, una forma de volver al centro cuando todo parece desbordar. Es una pausa que nos reencanta, un verdadero refugio. Es mi forma de compartir con vos un espacio vivo, sensible y en constante movimiento. Un lugar para tejer un modo distinto de habitar el presente, trascendiendo tendencias y en coherencia con quienes somos y con lo que soñamos ser.</p>
                    <p className="milagros__final-text">Gracias por estar acá. Refugio también es tuyo.</p>
                </div>
            </section>

            {/* 3. Nuestra Filosofía */}
            <section className={`philosophy-section ${philosophyInView ? 'is-in-view' : ''}`} ref={philosophyRef}>
                <h3 className="section-title">Nuestra Filosofía</h3>
                <p className="section-intro">
                    En Refugio, nuestra filosofía se manifiesta en cada decisión. Creemos que vestir es volver al cuerpo como territorio, al día como ritual, y a la belleza como lenguaje de cuidado.
                </p>
                <div className="philosophy-grid">
                    <div className="philosophy-card">
                        <span className="icon-placeholder">🌿</span>
                        <h4>Materiales</h4>
                        <p>Nos comprometemos con materiales nobles, reciclados o recuperados, favoreciendo textiles naturales y descartes revalorizados.</p>
                    </div>
                    <div className="philosophy-card">
                        <span className="icon-placeholder">🤲</span>
                        <h4>Producción</h4>
                        <p>Apostamos por una producción ética, local y artesanal que garantice una cadena de valor justa y respetuosa con las personas y el planeta.</p>
                    </div>
                    <div className="philosophy-card">
                        <span className="icon-placeholder">🌱</span>
                        <h4>Sostenibilidad</h4>
                        <p>Entendemos la sostenibilidad no solo como una práctica, sino como una ética, una estética y una forma vital de ser.</p>
                    </div>
                    <div className="philosophy-card">
                        <span className="icon-placeholder">❤️</span>
                        <h4>Consciencia</h4>
                        <p>Creemos en el vestir consciente como una forma de volver al cuerpo, al día como ritual y a la belleza como cuidado.</p>
                    </div>
                </div>
            </section>

            {/* 4. Universo Creativo */}
            <section className={`creative-universe-section ${creativeInView ? 'is-in-view' : ''}`} ref={creativeRef}>
                <h3 className="section-title">Universo Creativo</h3>
                <p className="section-intro">
                    Nuestro universo creativo se inspira en los refugios de la naturaleza y en el vasto patrimonio cultural que nos atraviesa. Toma forma en el cruce entre el diseño consciente, la experimentación textil y la poesía visual. En él resuenan influencias como el movimiento **Eurindia** de Ricardo Rojas, la calma del **Slow Living**, y la filosofía estética del **Wabi Sabi** japonés. Celebramos la belleza de la imperfección y la transitoriedad, invitando a contemplar lo efímero como una forma sublime de belleza.
                </p>
                <div className="moodboard-grid">
                    <div className="moodboard-item">
                        <img src="https://placehold.co/400x400/E8E4D9/444653?text=Eurindia" alt="Inspiración Eurindia" />
                        <div className="moodboard-overlay">
                            <span>Eurindia</span>
                        </div>
                    </div>
                    <div className="moodboard-item">
                        <img src="https://placehold.co/400x400/E8E4D9/444653?text=Slow+Living" alt="Inspiración Slow Living" />
                        <div className="moodboard-overlay">
                            <span>Slow Living</span>
                        </div>
                    </div>
                    <div className="moodboard-item">
                        <img src="https://placehold.co/400x400/E8E4D9/444653?text=Wabi+Sabi" alt="Inspiración Wabi Sabi" />
                        <div className="moodboard-overlay">
                            <span>Wabi Sabi</span>
                        </div>
                    </div>
                </div>
                
                <div className={`lifewear-philosophy ${lifewearInView ? 'is-in-view' : ''}`} ref={lifewearRef}>
                    <p>En este contexto, el concepto de **LifeWear** es un pilar fundamental. Concebimos nuestras prendas para la vida, como compañeras esenciales que se adaptan a tu ritmo y a tu historia. La funcionalidad del LifeWear contemporáneo se integra para crear piezas que no solo visten, sino que abrazan tu día a día con comodidad, versatilidad y una profunda conexión con tu bienestar. Cada prenda es diseñada para perdurar, para ser parte de tus rituales cotidianos, estableciendo una experiencia sensorial que va más allá de lo superficial. La moda, en Refugio, se convierte así en una extensión de tu ser, un diálogo constante con tu cuerpo y tu entorno.</p>
                    <p>Cada colección nace de una inspiración profunda en el patrimonio natural y cultural de los lugares que nos habitan o nos habitaron. Guiados por la esencia nómade de Refugio, cada cápsula narra una historia vinculada a la riqueza y la sabiduría de un lugar. Para nuestra próxima colección, nos sumergimos en la conexión con nuestro origen, la ciudad de Rosario, a través de la majestuosidad del río Paraná. Esta cápsula es un homenaje a la belleza, fuerza y serenidad de sus aguas, que se transforman en una paleta y una estampa que vibran con su esencia. Refleja cómo la naturaleza y la cultura se entrelazan para construir un refugio de sentido y estética, donde cada creación no solo se viste, sino que se vive.</p>
                    <Link to="/home/lifewear" className="lifewear-cta">Ver Cápsulas</Link>
                </div>
            </section>
        </div>
    );
};

export default AboutUs;