// src/hooks/useScrollAnimation.js
import { useInView } from 'react-intersection-observer';

/**
 * Hook personalizado para aplicar animaciones cuando un elemento entra en el viewport.
 * @param {object} options - Opciones de configuración para useInView.
 * @param {boolean} [options.triggerOnce=true] - Si la animación debe ocurrir solo una vez.
 * @param {number} [options.threshold=0.1] - La cantidad de visibilidad requerida para disparar el evento.
 * @returns {{elementRef: React.Ref, inView: boolean}} - Una referencia para adjuntar al elemento y un booleano que indica si está visible.
 */
const useScrollAnimation = (options = {}) => {
  const { ref, inView } = useInView({
    triggerOnce: options.triggerOnce !== undefined ? options.triggerOnce : true,
    threshold: options.threshold !== undefined ? options.threshold : 0.1,
  });

  return { elementRef: ref, inView };
};

export default useScrollAnimation;