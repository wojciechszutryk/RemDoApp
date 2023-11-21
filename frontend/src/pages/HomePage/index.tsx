import { Separator } from "atomicComponents/atoms/Separator";
import { motion } from "framer-motion";
import { TranslationKeys } from "framework/translations/translatedTexts/translationKeys";
import { memo, useLayoutEffect } from "react";
import { useTranslation } from "react-i18next";
import {
  FadeINLeftProps,
  FadeINRightProps,
  FadeInBottomProps,
  FadeInProps,
  FadeInTopProps,
} from "./animationProps";
import TopSection from "./components/TopSection";
import {
  StyledDetaildeSection,
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

  useLayoutEffect(() => {
    const title = `${t(TranslationKeys.PageTitleMain)} - ${t(
      TranslationKeys.PageTitleHome
    )}`;
    document.title = title;
  });

  return (
    <StyledHomePageWrapper>
      <section>
        <TopSection />
      </section>
      <StyledFeaturesSection>
        <motion.h2 {...FadeInProps}>Features</motion.h2>
        <ul>
          <li>
            <motion.div {...FadeINLeftProps}>
              <CollaborationImg />
            </motion.div>
            <motion.p {...FadeINRightProps}>
              collaboration with other users to create notes, todo lists and
              reminders <span>more</span>
            </motion.p>
          </li>
          <li>
            <motion.div {...FadeINRightProps}>
              <GoogleIntegrationImg />
            </motion.div>
            <motion.p {...FadeINLeftProps}>
              {
                "integration with Google to authenticate and import/export user's data from Google Callendar "
              }
              <span>more</span>
            </motion.p>
          </li>
          <li>
            <motion.div {...FadeINLeftProps}>
              <NotificationsImg />
            </motion.div>
            <motion.p {...FadeINRightProps}>
              personalized notifications including real time-and push
              notifications <span>more</span>
            </motion.p>
          </li>
          <li>
            <motion.div {...FadeINRightProps}>
              <GesturesImg />
            </motion.div>
            <motion.p {...FadeINLeftProps}>
              innovative interface based on animations and gestures{" "}
              <span>more</span>
            </motion.p>
          </li>
          <li>
            <motion.div {...FadeINLeftProps}>
              <ThemeImg />
            </motion.div>

            <motion.p {...FadeINRightProps}>
              high customization of interface, support of different themes and
              languages <span>more</span>
            </motion.p>
          </li>
        </ul>
      </StyledFeaturesSection>
      <StyledDetaildeSection>
        <motion.h3 {...FadeInProps}>Collaborations</motion.h3>
        <motion.div {...FadeInTopProps}>
          <CollaborationImgAlt />
        </motion.div>
        <motion.div {...FadeInProps}>
          <Separator text="details" />
        </motion.div>
        <motion.p {...FadeInBottomProps}>
          Users have the ability to seamlessly invite others to collaborate on
          shared resources. This feature promotes teamwork by allowing users to
          extend invitations to colleagues, friends, or project partners. Within
          this collaborative space, users can not only create comprehensive
          to-do lists and reminders but also effortlessly share these resources
          with their collaborators. This sharing functionality enhances
          communication and coordination, ensuring that everyone involved is on
          the same page regarding tasks and deadlines. Additionally, users can
          exercise control over collaboration by managing permissions to
          resources, providing a customizable and secure environment for
          collective task management.
        </motion.p>
      </StyledDetaildeSection>
      <StyledDetaildeSection>
        <motion.h3 {...FadeInProps}>Google Integration</motion.h3>
        <motion.div {...FadeInTopProps}>
          <GoogleIntegrationImgAlt />
        </motion.div>
        <motion.div {...FadeInProps}>
          <Separator text="details" />
        </motion.div>
        <motion.p {...FadeInBottomProps}>
          Users can streamline their experience by utilizing Google
          authentication for a seamless login and register process. This
          integration extends to the synchronization of Google Calendar,
          allowing users automaticly to import and export data between RemDo and
          Google Calendar. As a result, resources created in the Google Calendar
          interface become readily accessible within RemDo, fostering a unified
          and interconnected user experience. Furthermore, this integration
          operates bidirectionally, ensuring that changes made in RemDo are
          reflected in Google Calendar and vice versa, facilitating real-time
          collaboration and data consistency across platforms.
        </motion.p>
      </StyledDetaildeSection>
      <StyledDetaildeSection>
        <motion.h3 {...FadeInProps}>Notifications</motion.h3>
        <motion.div {...FadeInTopProps}>
          <NotificationsImgAlt />
        </motion.div>
        <motion.div {...FadeInProps}>
          <Separator text="details" />
        </motion.div>
        <motion.p {...FadeInBottomProps}>
          Users have the flexibility to set notifications before or after the
          start or finish date of a task or reminder, ensuring timely awareness.
          These notifications can manifest in real-time within the user
          interface or as push notifications, reaching users even when they are
          not actively using the application. To manage these alerts
          effectively, users are provided with a dedicated panel where they can
          archive or delete notifications based on their preferences.
          Additionally, within the user settings menu, individuals can further
          tailor their experience by personalizing the types of notifications
          they wish to receive, offering a customizable and user-centric
          notification system.
        </motion.p>
      </StyledDetaildeSection>
      <StyledDetaildeSection>
        <motion.h3 {...FadeInProps}>Interface</motion.h3>
        <motion.div {...FadeInTopProps}>
          <GesturesImgAlt />
        </motion.div>
        <motion.div {...FadeInProps}>
          <Separator text="details" />
        </motion.div>
        <motion.p {...FadeInBottomProps}>
          RemDo web application introduces an innovative design centered around
          animations and gestures. Characterized by a minimalistic approach, the
          interface deliberately displays only essential information, offering a
          clean and focused user experience. Interactions are cleverly concealed
          behind intuitive gestures such as swipes and switches, providing users
          with a seamless and efficient navigation experience. The interface is
          not only minimal but also responsive, adapting dynamically to various
          screen sizes and devices. Elevating the overall user experience, a
          plethora of animations are integrated throughout the interface,
          enhancing engagement and making interactions more visually appealing.
        </motion.p>
      </StyledDetaildeSection>
      <StyledDetaildeSection>
        <motion.h3 {...FadeInProps}>Personalization</motion.h3>
        <motion.div {...FadeInTopProps}>
          <ThemeImgAlt />
        </motion.div>

        <motion.div {...FadeInProps}>
          <Separator text="details" />
        </motion.div>
        <motion.p {...FadeInBottomProps}>
          RemDo web application is dedicated to providing users with a high
          degree of customization for their interface. Users have the
          flexibility to switch between different themes and languages,
          tailoring their experience to suit individual preferences. Beyond the
          aesthetics, personalization extends to the user profile, allowing
          individuals to add a personal touch with features such as photo
          display and a customizable display name. Moreover, users can finely
          tune their notification preferences, selecting exactly which alerts
          they wish to receive, ensuring a personalized and streamlined
          communication experience within the application. This comprehensive
          personalization feature enhances user engagement and satisfaction.
        </motion.p>
      </StyledDetaildeSection>
    </StyledHomePageWrapper>
  );
};

export default memo(HomePage);
