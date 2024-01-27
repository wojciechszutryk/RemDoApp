export const FadeINRightProps = {
  initial: {
    opacity: 0,
    x: 100,
  },
  transition: { duration: 0.5 },
  whileInView: { opacity: 1, x: 0 },
  viewport: { once: true },
};

export const FadeINLeftProps = {
  ...FadeINRightProps,
  initial: {
    ...FadeINRightProps.initial,
    x: -100,
  },
};

export const FadeInTopProps = {
  initial: {
    opacity: 0,
    y: -100,
  },
  transition: { duration: 0.5, delay: 0.3 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true },
};

export const FadeInBottomProps = {
  initial: {
    opacity: 0,
    y: 100,
  },
  transition: { duration: 0.5 },
  whileInView: { opacity: 1, y: 0 },
};

export const FadeInProps = {
  initial: {
    opacity: 0,
  },
  transition: { duration: 0.7 },
  whileInView: { opacity: 1 },
  viewport: { once: true },
};
