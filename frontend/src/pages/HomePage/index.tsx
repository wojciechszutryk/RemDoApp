import { Separator } from "atomicComponents/atoms/Separator";
import { LAST_PAGE_LS_KEY } from "atomicComponents/organisms/Header/helpers/LS.keys.const.helper";
import { motion } from "framer-motion";
import { SessionAgeLSKey } from "framework/authentication/helpers/sessionAge.helper";
import { useLoginUserWithCookieMutation } from "framework/authentication/mutations/useLoginUserWithCookie.mutation";
import { useDialogs } from "framework/dialogs";
import { TranslationKeys } from "framework/translations/translatedTexts/translationKeys";
import { URL_COLLABORANTS } from "linked-models/collaboration/collaboration.urls";
import { ExpiryParam } from "linked-models/user/auth.consts";
import { memo, useEffect, useLayoutEffect, useRef } from "react";
import { useTranslation } from "react-i18next";
import { useLocation, useNavigate } from "react-router-dom";
import {
  FadeINLeftProps,
  FadeINRightProps,
  FadeInBottomProps,
  FadeInProps,
  FadeInTopProps,
} from "./animationProps";
import TopSection from "./components/TopSection";
import {
  StyledDetailedSection,
  StyledFeaturesSection,
  StyledHomePageWrapper,
} from "./styles";
import CollaborationImg from "./utils/CollaborationImg";
import CollaborationImgAlt from "./utils/CollaborationImgAlt";
import GesturesImg from "./utils/GesturesImg";
import GesturesImgAlt from "./utils/GesturesImgAlt";
import GoogleIntegrationImg from "./utils/GoogleIntegrationImg";
import GoogleIntegrationImgAlt from "./utils/GoogleIntegrationImgAlt";
import NotificationsImg from "./utils/NotificationsImg";
import NotificationsImgAlt from "./utils/NotificationsImgAlt";
import ThemeImg from "./utils/ThemeImg";
import ThemeImgAlt from "./utils/ThemeImgAlt";

const HomePage = (): JSX.Element => {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const location = useLocation();
  //sections refs
  const featuresRef = useRef<HTMLDivElement>(null);
  const collaborationRef = useRef<HTMLDivElement>(null);
  const googleRef = useRef<HTMLDivElement>(null);
  const notificationsRef = useRef<HTMLDivElement>(null);
  const interfaceRef = useRef<HTMLDivElement>(null);
  const personalizationRef = useRef<HTMLDivElement>(null);
  const loginUserWithCookieMutation = useLoginUserWithCookieMutation();

  const {
    dialogsActions: { updateCollaborantsDrawer },
  } = useDialogs();

  useEffect(() => {
    if (location.pathname.includes(URL_COLLABORANTS)) {
      updateCollaborantsDrawer({ visible: true });
    }
  }, []);

  useLayoutEffect(() => {
    const title = `${t(TranslationKeys.PageTitleMain)} - ${t(
      TranslationKeys.PageTitleHome
    )}`;
    document.title = title;
  }, []);

  const handleScroll = (ref: React.RefObject<HTMLDivElement>) => () => {
    ref.current?.scrollIntoView({
      behavior: "smooth",
    });
  };

  useEffect(() => {
    //for google auth - when we are redirected from google auth (ExpiryParam in url)
    const searchParams = new URLSearchParams(window.location.search);
    const expiry = searchParams.get(ExpiryParam);

    if (expiry && !loginUserWithCookieMutation.isLoading) {
      //login user with cookie
      loginUserWithCookieMutation.mutate();

      //set expiry in local storage for auto login in the future
      localStorage.setItem(SessionAgeLSKey, expiry);

      // redirect to last page
      const lastPage = localStorage.getItem(LAST_PAGE_LS_KEY);

      if (lastPage) {
        navigate(lastPage);
      } else {
        navigate("/");
      }

      //clean expiry param from url
      window.history.pushState({}, document.title, window.location.pathname);
    }
  }, [loginUserWithCookieMutation, navigate]);

  return (
    <StyledHomePageWrapper>
      <section>
        <TopSection handleScrollToFeatures={handleScroll(featuresRef)} />
      </section>
      <StyledFeaturesSection ref={featuresRef}>
        <motion.h2 {...FadeInProps}>{t(TranslationKeys.Features)}</motion.h2>
        <ul>
          {[
            {
              img: <CollaborationImg />,
              text: t(TranslationKeys.CollaborationsDescShort),
              ref: collaborationRef,
            },
            {
              img: <GoogleIntegrationImg />,
              text: t(TranslationKeys.GoogleIntegrationDescShort),
              ref: googleRef,
            },
            {
              img: <NotificationsImg />,
              text: t(TranslationKeys.NotificationsDescShort),
              ref: notificationsRef,
            },
            {
              img: <GesturesImg />,
              text: t(TranslationKeys.InterfaceDescShort),
              ref: interfaceRef,
            },
            {
              img: <ThemeImg />,
              text: t(TranslationKeys.PersonalizationDescShort),
              ref: personalizationRef,
            },
          ].map(({ img, text, ref }) => (
            <li key={text}>
              <motion.div {...FadeINLeftProps}>{img}</motion.div>
              <motion.p {...FadeINRightProps}>
                {text}{" "}
                <span onClick={handleScroll(ref)}>
                  {t(TranslationKeys.More)}
                </span>
              </motion.p>
            </li>
          ))}
        </ul>
      </StyledFeaturesSection>
      {[
        {
          title: t(TranslationKeys.Collaborations),
          img: <CollaborationImgAlt />,
          text: t(TranslationKeys.CollaborationsDescLong),
          ref: collaborationRef,
        },
        {
          title: t(TranslationKeys.GoogleIntegration),
          img: <GoogleIntegrationImgAlt />,
          text: t(TranslationKeys.GoogleIntegrationDescLong),
          ref: googleRef,
        },
        {
          title: t(TranslationKeys.Notifications),
          img: <NotificationsImgAlt />,
          text: t(TranslationKeys.NotificationsDescLong),
          ref: notificationsRef,
        },
        {
          title: t(TranslationKeys.Interface),
          img: <GesturesImgAlt />,
          text: t(TranslationKeys.InterfaceDescLong),
          ref: interfaceRef,
        },
        {
          title: t(TranslationKeys.Personalization),
          img: <ThemeImgAlt />,
          text: t(TranslationKeys.PersonalizationDescLong),
          ref: personalizationRef,
        },
      ].map(
        ({ title, img, text, ref }) =>
          ref && (
            <StyledDetailedSection ref={ref} key={title}>
              <motion.h3 {...FadeInProps}>{title}</motion.h3>
              <motion.div {...FadeInTopProps}>{img}</motion.div>
              <motion.div {...FadeInProps}>
                <Separator text={t(TranslationKeys.Details)} />
              </motion.div>
              <motion.p {...FadeInBottomProps}>{text}</motion.p>
            </StyledDetailedSection>
          )
      )}
    </StyledHomePageWrapper>
  );
};

export default memo(HomePage);
