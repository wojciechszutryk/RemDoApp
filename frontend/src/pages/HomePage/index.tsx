import { Separator } from "atomicComponents/atoms/Separator";
import { LAST_PAGE_LS_KEY } from "atomicComponents/organisms/Header/helpers/LS.keys.const.helper";
import { motion } from "framer-motion";
import { SessionAgeLSKey } from "framework/authentication/helpers/sessionAge.helper";
import { TranslationKeys } from "framework/translations/translatedTexts/translationKeys";
import { ExpiryParam } from "linked-models/user/auth.consts";
import { memo, useEffect, useLayoutEffect, useRef } from "react";
import { useTranslation } from "react-i18next";
import { useNavigate } from "react-router-dom";
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
  //sections refs
  const featuresRef = useRef<HTMLDivElement>(null);
  const collaborationRef = useRef<HTMLDivElement>(null);
  const googleRef = useRef<HTMLDivElement>(null);
  const notificationsRef = useRef<HTMLDivElement>(null);
  const interfaceRef = useRef<HTMLDivElement>(null);
  const personalizationRef = useRef<HTMLDivElement>(null);

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
    //for google auth
    const searchParams = new URLSearchParams(window.location.search);
    const expiry = searchParams.get(ExpiryParam);

    if (expiry) {
      localStorage.setItem(SessionAgeLSKey, expiry);

      const lastPage = localStorage.getItem(LAST_PAGE_LS_KEY);

      if (lastPage) {
        navigate(lastPage);
      } else {
        navigate("/");
      }

      window.history.pushState({}, document.title, window.location.pathname);
    }
  }, []);

  return (
    <StyledHomePageWrapper>
      <section>
        <TopSection handleScrollToFeatures={handleScroll(featuresRef)} />
      </section>
      <StyledFeaturesSection ref={featuresRef}>
        <motion.h2 {...FadeInProps}>{t(TranslationKeys.Features)}</motion.h2>
        <ul>
          <li>
            <motion.div {...FadeINLeftProps}>
              <CollaborationImg />
            </motion.div>
            <motion.p {...FadeINRightProps}>
              {t(TranslationKeys.CollaborationsDescShort)}{" "}
              <span onClick={handleScroll(collaborationRef)}>
                {t(TranslationKeys.More)}
              </span>
            </motion.p>
          </li>
          <li>
            <motion.div {...FadeINRightProps}>
              <GoogleIntegrationImg />
            </motion.div>
            <motion.p {...FadeINLeftProps}>
              {t(TranslationKeys.GoogleIntegrationDescShort)}{" "}
              <span onClick={handleScroll(googleRef)}>
                {t(TranslationKeys.More)}
              </span>
            </motion.p>
          </li>
          <li>
            <motion.div {...FadeINLeftProps}>
              <NotificationsImg />
            </motion.div>
            <motion.p {...FadeINRightProps}>
              {t(TranslationKeys.NotificationsDescShort)}{" "}
              <span onClick={handleScroll(notificationsRef)}>
                {t(TranslationKeys.More)}
              </span>
            </motion.p>
          </li>
          <li>
            <motion.div {...FadeINRightProps}>
              <GesturesImg />
            </motion.div>
            <motion.p {...FadeINLeftProps}>
              {t(TranslationKeys.InterfaceDescShort)}{" "}
              <span onClick={handleScroll(interfaceRef)}>
                {t(TranslationKeys.More)}
              </span>
            </motion.p>
          </li>
          <li>
            <motion.div {...FadeINLeftProps}>
              <ThemeImg />
            </motion.div>
            <motion.p {...FadeINRightProps}>
              {t(TranslationKeys.PersonalizationDescShort)}{" "}
              <span onClick={handleScroll(personalizationRef)}>
                {t(TranslationKeys.More)}
              </span>
            </motion.p>
          </li>
        </ul>
      </StyledFeaturesSection>
      <StyledDetailedSection ref={collaborationRef}>
        <motion.h3 {...FadeInProps}>
          {t(TranslationKeys.Collaborations)}
        </motion.h3>
        <motion.div {...FadeInTopProps}>
          <CollaborationImgAlt />
        </motion.div>
        <motion.div {...FadeInProps}>
          <Separator text={t(TranslationKeys.Details)} />
        </motion.div>
        <motion.p {...FadeInBottomProps}>
          {t(TranslationKeys.CollaborationsDescLong)}
        </motion.p>
      </StyledDetailedSection>
      <StyledDetailedSection ref={googleRef}>
        <motion.h3 {...FadeInProps}>
          {t(TranslationKeys.GoogleIntegration)}
        </motion.h3>
        <motion.div {...FadeInTopProps}>
          <GoogleIntegrationImgAlt />
        </motion.div>
        <motion.div {...FadeInProps}>
          <Separator text={t(TranslationKeys.Details)} />
        </motion.div>
        <motion.p {...FadeInBottomProps}>
          {t(TranslationKeys.GoogleIntegrationDescLong)}
        </motion.p>
      </StyledDetailedSection>
      <StyledDetailedSection ref={notificationsRef}>
        <motion.h3 {...FadeInProps}>
          {t(TranslationKeys.Notifications)}
        </motion.h3>
        <motion.div {...FadeInTopProps}>
          <NotificationsImgAlt />
        </motion.div>
        <motion.div {...FadeInProps}>
          <Separator text={t(TranslationKeys.Details)} />
        </motion.div>
        <motion.p {...FadeInBottomProps}>
          {t(TranslationKeys.NotificationsDescLong)}
        </motion.p>
      </StyledDetailedSection>
      <StyledDetailedSection ref={interfaceRef}>
        <motion.h3 {...FadeInProps}>{t(TranslationKeys.Interface)}</motion.h3>
        <motion.div {...FadeInTopProps}>
          <GesturesImgAlt />
        </motion.div>
        <motion.div {...FadeInProps}>
          <Separator text={t(TranslationKeys.Details)} />
        </motion.div>
        <motion.p {...FadeInBottomProps}>
          {t(TranslationKeys.InterfaceDescLong)}
        </motion.p>
      </StyledDetailedSection>
      <StyledDetailedSection ref={personalizationRef}>
        <motion.h3 {...FadeInProps}>
          {t(TranslationKeys.Personalization)}
        </motion.h3>
        <motion.div {...FadeInTopProps}>
          <ThemeImgAlt />
        </motion.div>

        <motion.div {...FadeInProps}>
          <Separator text={t(TranslationKeys.Details)} />
        </motion.div>
        <motion.p {...FadeInBottomProps}>
          {" "}
          {t(TranslationKeys.PersonalizationDescLong)}
        </motion.p>
      </StyledDetailedSection>
    </StyledHomePageWrapper>
  );
};

export default memo(HomePage);
