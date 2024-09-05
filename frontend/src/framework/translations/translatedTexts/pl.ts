import { TranslationKeys } from "./translationKeys";

export const plTranslation: Record<TranslationKeys, string> = {
  [TranslationKeys.PageTitleMain]: "RemDo",
  [TranslationKeys.FieldRequired]: "* Wymagane",
  [TranslationKeys.NumberMustBePositive]: "* Wartość musi być dodatnia",

  [TranslationKeys.NoAccess]: "Nie posiadasz wymaganych uprawnień.",
  [TranslationKeys.NoValidTokenInfo]:
    "Aby uzyskać dostęp do tej strony, musisz posiadać ważny token. Nie wykryto żadnego tokenu, jest on nieprawidłowy lub wygasł.",

  [TranslationKeys.Features]: "Funkcje",
  [TranslationKeys.Collaborations]: "Współpraca",
  [TranslationKeys.CollaborationsDescShort]:
    "współpracuj z innymi użytkownikami w celu tworzenia notatek, list zadań i przypomnień",
  [TranslationKeys.CollaborationsDescLong]:
    "Użytkownicy mają możliwość zapraszania innych do współpracy przy tworzeniu wspólnych zasobów. Ta funkcja wspiera pracę zespołową, umożliwiając użytkownikom wysyłanie zaproszeń do współpracy z członkami rodziny, przyjaciółmi czy partnerami projektowymi. W ramach współpracy użytkownicy mogą nie tylko tworzyć obszerne listy zadań i przypomnienia, ale także łatwo dzielić się tymi zasobami ze współpracownikami. Ta funkcjonalność ułatwia koordynację, zapewniając, że wszyscy współpracownicy mają dostęp do tych samych zadań i będą świadomi upływających terminów. Dodatkowo, użytkownicy mogą zarządzać swoimi współpracami oraz uprawnieniami do zasobów, co zapewnia dostosowane i bezpieczne środowisko do notatek i przypomnień",
  [TranslationKeys.GoogleIntegrationDescShort]:
    "integracja z Google w celu uwierzytelniania i importu/eksportu wydarzeń z kalendarza Google",
  [TranslationKeys.GoogleIntegrationDescLong]:
    "Użytkownicy mogą zoptymalizować swoje doświadczenie, korzystając z uwierzytelniania Google dla bezproblemowego procesu logowania i rejestracji. Integracja ta obejmuje synchronizację kalendarza Google, umożliwiając użytkownikom automatyczne importowanie i eksportowanie danych między RemDo a kalendarzem Google. W rezultacie zasoby utworzone w interfejsie kalendarza Google stają się łatwo dostępne w RemDo, tworząc jednolite doświadczenie użytkownika. Ponadto integracja ta działa dwukierunkowo, zapewniając, że zmiany dokonane w RemDo są odzwierciedlane w kalendarzu Google i vice versa, ułatwiając współpracę w czasie rzeczywistym i spójność danych między platformami.",
  [TranslationKeys.NotificationsDescShort]:
    "spersonalizowane powiadomienia, w tym powiadomienia czasu rzeczywistego i push",
  [TranslationKeys.NotificationsDescLong]:
    "Użytkownicy mają elastyczność w kontekście ustawiania powiadomień przed lub po dacie rozpoczęcia lub zakończenia zadania lub przypomnienia, zapewniając przejrzystość co do daty jego wysłania. Powiadomienia mogą pojawiać się w czasie rzeczywistym w interfejsie użytkownika lub jako powiadomienia push, docierając do użytkowników nawet wtedy, gdy nie korzystają aktywnie z aplikacji. Aby skutecznie zarządzać tymi alertami, użytkownicy mają dedykowany panel, gdzie mogą archiwizować lub usuwać powiadomienia zgodnie z własnymi preferencjami. Dodatkowo, w menu ustawień użytkownika, osoby mogą dostosowywać swoje doświadczenie, personalizując rodzaje powiadomień, jakie chcą otrzymywać, co zapewnia pełny i niezawodny system powiadomień.",
  [TranslationKeys.Interface]: "Interfejs",
  [TranslationKeys.InterfaceDescShort]:
    "innowacyjny interfejs oparty na animacjach i gestach",
  [TranslationKeys.InterfaceDescLong]:
    "Aplikacja internetowa RemDo wprowadza innowacyjny design oparty na animacjach i gestach. Charakteryzujący się minimalistycznym podejściem interfejs celowo wyświetla tylko istotne informacje, oferując czyste i skoncentrowane doświadczenie użytkownika. Interakcje są sprytnie ukryte za intuicyjnymi gestami, takimi jak przesuwanie i przełączanie, co zapewnia użytkownikom płynne i efektywne doświadczenie nawigacyjne. Interfejs nie tylko jest minimalistyczny, ale także responsywny, dostosowujący się dynamicznie do różnych rozmiarów ekranów i urządzeń. Podnosząc ogólne doświadczenie użytkownika, w interfejsie zintegrowano mnóstwo animacji, poprawiając zaangażowanie i czyniąc interakcje bardziej atrakcyjnymi wizualnie.",
  [TranslationKeys.Personalization]: "Personalizacja",
  [TranslationKeys.PersonalizationDescShort]:
    "wysoka personalizacja interfejsu, obsługa różnych motywów i języków",
  [TranslationKeys.PersonalizationDescLong]:
    "Aplikacja internetowa RemDo zapewnia użytkownikom wysoki stopień dostosowania ich interfejsu. Użytkownicy mają elastyczność przełączania się między różnymi motywami i językami, dostosowując swoje doświadczenie do indywidualnych preferencji. Poza aspektami estetycznymi, personalizacja obejmuje także profil użytkownika, umożliwiając jednostkom dodanie osobistego akcentu, takiego jak zdjęcie profilowe czy niestandardowa nazwa wyświetlana. Ponadto użytkownicy mogą precyzyjnie dostosować swoje preferencje dotyczące powiadomień, wybierając dokładnie, jakie alerty chcą otrzymywać, zapewniając spersonalizowane i uporządkowane doświadczenie komunikacyjne w ramach aplikacji. Ta kompleksowa funkcja personalizacji podnosi zaangażowanie i satysfakcję użytkownika.",
  [TranslationKeys.ForgetPasswordSuccess]: "Wysłano link do resetu hasła.",
  [TranslationKeys.ForgetPasswordError]: "Nie udało się wysłać linku.",
  [TranslationKeys.ForgetPasswordChangeError]:
    "Nie udało się zmienić hasła. Spróbuj ponownie.",
  [TranslationKeys.ForgetPassword]: "Zapomniałeś hasła?",

  [TranslationKeys.PageTitleHome]: "Główna",
  [TranslationKeys.PageTitleSignIn]: "Logowanie",
  [TranslationKeys.PageTitleSignUp]: "Rejestracja",
  [TranslationKeys.WelcomeTextDescription]:
    "Witamy w RemDo! Dzięki naszej aplikacji możesz z łatwością być na bieżąco z codziennymi zadaniami i nigdy więcej nie zapomnieć o ważnym spotkaniu. Nasz przyjazny dla użytkownika interfejs i konfigurowalne funkcje ułatwiają tworzenie, organizowanie i ustalanie priorytetów list rzeczy do zrobienia i przypomnień. Zacznij już dziś i przejmij kontrolę nad swoim napiętym harmonogramem!",
  [TranslationKeys.LoginPanelSeparatorText]: "lub",
  [TranslationKeys.GoToFeaturesButtonText]: "Poznaj funkcje",
  [TranslationKeys.LoginPanelHeader]: "Zaloguj się lub zarejestruj",
  [TranslationKeys.IntegrateWithGoogleDesc]:
    "Aby zintegrować się z google, musisz użyć tego samego adresu e-mail, co w aktualnym koncie. Jeśli używasz innego, zostanie utworzone nowe konto w serwisie. Po kliknięciu przycisku zostaniesz przekierowany na stronę logowania google. Po pomyślnym zalogowaniu zostaniesz przekierowany z powrotem do naszej aplikacji.",
  [TranslationKeys.UserIntegratedWithGoogle]:
    "Jesteś już zintegrowany/a z google.",
  [TranslationKeys.Email]: "email",
  [TranslationKeys.JoinDate]: "data dołączenia",
  [TranslationKeys.DisplayName]: "nazwa użytkownika",
  [TranslationKeys.Password]: "hasło",
  [TranslationKeys.PasswordRepeat]: "powtórzenie hasła",
  [TranslationKeys.LoginButtonText]: "zaloguj się",
  [TranslationKeys.RegisterButtonText]: "zarejestruj się",
  [TranslationKeys.GoogleSignIn]: "google",
  [TranslationKeys.EmailRequired]: "email wymagany",
  [TranslationKeys.DisplayNameRequired]: "nazwa użytkownika wymagana",
  [TranslationKeys.WrongPassword]: "hasło nieprawidłowe",
  [TranslationKeys.PasswordsNoMatch]: "hasła nie są identyczne",
  [TranslationKeys.LoginSuccess]: "Zalogowano pomyślnie.",
  [TranslationKeys.RegisterSuccess]:
    "Zarejestrowano pomyślnie. Nie zapomnij zweryfikować konta. Sprawdź swoją skrzynkę.",
  [TranslationKeys.InvalidCredentials]: "niepoprawne dane, spróbuj ponownie",
  [TranslationKeys.CurrentAccount]: "Twoje konto",
  [TranslationKeys.EmailNotVerified]:
    "Aby się zalogować musisz zweryfikować konto. Wysłaliśmy Ci link do weryfikacji na email. Sprawdź swoją skrzynkę.",
  [TranslationKeys.ResendVerificationEmail]:
    "Wyślij ponownie link weryfikacyjny",
  [TranslationKeys.EmailSent]: "Wysłano email.",

  [TranslationKeys.VerifyAccountTitle]: "Zweryfikuj konto",
  [TranslationKeys.VerifyAccountDescription]:
    "Przed zalogowaniem zweryfikuj konto",
  [TranslationKeys.VerifyAccountSuccess]:
    "Konto zweryfikowane pomyślnie, możesz się teraz zalogować.",

  [TranslationKeys.PageTitleReminders]: "Przypomnienia",
  [TranslationKeys.Reminder]: "Przypomnienie",
  [TranslationKeys.ReminderInfo]:
    "Utwórz nowe przypomnienie. Będzie ono widoczne jedynie w twoim kalendarzu. ",
  [TranslationKeys.ScopeChoose]: "Wybierz zakres",
  [TranslationKeys.ScopeDescription]:
    "Wybierz przypomnienie aby widoczny był jedynie w twoim kalendarzu lub wybierz listę zadań aby był częścią tej listy",
  [TranslationKeys.OrChooseTodoList]: "Lub wybierz listę zadań",
  [TranslationKeys.EditReminder]: "Edytuj przypomnienie",
  [TranslationKeys.CreateReminder]: "Utwórz przypomnienie",
  [TranslationKeys.ReminderName]: "Nazwa przypomnienia",
  [TranslationKeys.ReminderDescription]: "Opis przypomnienia",

  [TranslationKeys.Week]: "Tydzień",
  [TranslationKeys.WorkWeek]: "Dni robocze",
  [TranslationKeys.Day]: "Dzień",
  [TranslationKeys.Month]: "Miesiąc",
  [TranslationKeys.Previous]: "Poprzedni",
  [TranslationKeys.Next]: "Następny",
  [TranslationKeys.Today]: "Dzisiaj",
  [TranslationKeys.Agenda]: "Agenda",
  [TranslationKeys.NoEventsInRange]: "Brak wydarzeń w tym zakresie",
  [TranslationKeys.AllDay]: "Cały dzień",
  [TranslationKeys.More]: "więcej",
  [TranslationKeys.Date]: "Data",
  [TranslationKeys.Time]: "Czas",
  [TranslationKeys.Event]: "Wydarzenie",

  [TranslationKeys.Search]: "Szukaj",
  [TranslationKeys.LastSearches]: "Historia wyszukiwania",
  [TranslationKeys.ClearHistory]: "Wyczyść historię",

  [TranslationKeys.Collaborants]: "Twoi współpracownicy",
  [TranslationKeys.CollaborantsSearch]: "Szukaj użytkownika",
  [TranslationKeys.ShowMyCollaborations]: "Pokaż moje współprace",
  [TranslationKeys.SearchForUser]: "Wyszukaj użytkownika",
  [TranslationKeys.InviteCollaborants]: "Zaproś kogoś",
  [TranslationKeys.YouHaveNoCollaborants]: "Nie masz współpracowników",
  [TranslationKeys.EmptySearchResults]:
    "Brak wyników wyszukiwania dla podanej frazy",
  [TranslationKeys.InviteUser]: "Zaproś użytkownika do współpracy",
  [TranslationKeys.CollaborationPending]: "Współpraca oczekuje na akceptację",
  [TranslationKeys.CollaborationAccepted]: "Współpraca zaakceptowana",
  [TranslationKeys.CollaborationRejected]: "Współpraca odrzucona",
  [TranslationKeys.CollaborationBlocked]:
    "Współpraca z użytkownikiem zablokowana",
  [TranslationKeys.CollaborationReOpened]:
    "Zaproszenie do współpracy ponownie otwarte",
  [TranslationKeys.WaitingForAcceptance]:
    "Oczekiwanie na akceptację współpracy przez użytkownika",
  [TranslationKeys.Accept]: "Akceptuj",
  [TranslationKeys.Reject]: "Odrzuć",
  [TranslationKeys.AlreadyCollaborant]:
    "Jesteś współpracownikiem tego użytkownika",
  [TranslationKeys.DeleteCollaboration]:
    "Usuń użytkownika z listy współpracowników",
  [TranslationKeys.UserRejectedCollaboration]: "Użytkownik odrzucił współpracę",
  [TranslationKeys.InviteAgain]: "Zaproś ponownie",
  [TranslationKeys.YouRejectedButCanAccept]:
    "Odrzuciłeś zaproszenie, ale możesz je ponownie zaakceptować",
  [TranslationKeys.YouBlockedButCanUnblock]:
    "Zablokowałeś użytkownika, ale możesz go odblokować",
  [TranslationKeys.NoCollaborantOption]:
    "Nie masz współpracownika z nazwą zawierającą podaną frazę",
  [TranslationKeys.Block]: "Zablokuj",
  [TranslationKeys.Unblock]: "Odblokuj",

  [TranslationKeys.PageTitleTodoLists]: "Listy zadań",
  [TranslationKeys.EmptyTodoLists]: "Brak list zadań. Utwórz nową listę!",
  [TranslationKeys.CreateNewTodoList]: "Utwórz nową listę zadań",
  [TranslationKeys.EditTodoListDialogHeader]: "Edytuj listę zadań",
  [TranslationKeys.CreateTodoListDialogHeader]: "Utwórz nową listę zadań",
  [TranslationKeys.ShareTodoList]: "Udostępnij listę zadań",
  [TranslationKeys.TodoListDialogInputTitle]: "Tytuł listy",
  [TranslationKeys.TodoListDialogButton]: "Zapisz",
  [TranslationKeys.ManageOwners]: "Zarządzaj właścicielami",
  [TranslationKeys.ManageUsers]: "Zarządzaj użytkownikami",
  [TranslationKeys.CurrentOwners]: "Właściciele",
  [TranslationKeys.CurrentUsers]: "Użytkownicy",
  [TranslationKeys.DelteTodoList]: "Usuń listę zadań",
  [TranslationKeys.ReorderTasks]: "Zmień kolejność zadań",
  [TranslationKeys.ErrorWhileReordering]:
    "Nastąpił błąd przy zapisie nowe kolejności.",
  [TranslationKeys.DelteTodoListWarning]:
    "Czy na pewno chcesz usunąć tę listę zadań? Ta operacja jest nieodwracalna. Wszystkie zadania powiązane z tą listą zostaną usunięte.",
  [TranslationKeys.Other]: "Inne",
  [TranslationKeys.BackToTodoLists]: "Powrót do list zadań",
  [TranslationKeys.ManageAccess]: "Zarządzaj dostępem",
  [TranslationKeys.DeleteReminder]: "Usuń przypomnienie",
  [TranslationKeys.DeleteReminderWarning]:
    "Gdy usuniesz przypomnienie, nie będzie ono dostępne dla Ciebie i żadnego z innych przypisanych użytkowników. Jeśli zaplanowano powiadomienie dla tego przypomnienia, nie zostanie ono uruchomione po usunięciu. Nie możesz cofnąć tej akcji.",
  [TranslationKeys.GeneralInfo]: "Informacje ogólne",
  [TranslationKeys.GeneralInfoReminderDescription]:
    "Podaj podstawowe informacje o przypomnieniu, m.in. nazwę, zakres dat, zakres",
  [TranslationKeys.ManageAccessReminderDescription]:
    "Zarządzaj dostępem do przypomnienia. Możesz udostępnić przypomnienie wybranej osobie z listy współpracowników. Możesz przypisać jej rolę właściciela lub użytkownika. Właściciel może zarządzać dostępem do przypomnienia",
  [TranslationKeys.DeleteReminderDescription]:
    "Usuń przypomnienie. Nie możesz cofnąć tej akcji.",
  [TranslationKeys.SetNotification]: "Ustaw powiadomienie",
  [TranslationKeys.SetNotificationDescription]:
    "Podaj szczegóły kiedy powiadomienie z przypomnieniem powinno zostać wysłane.",

  [TranslationKeys.CreateTodoShareLink]: "Utwórz link dostępu",
  [TranslationKeys.CreateTodoShareLinkDescription]:
    "Wybierz uprawnienia dla użytkowników z linkiem dostępu.",
  [TranslationKeys.InviteCollaborantsToTodoList]: "Zaproś",
  [TranslationKeys.CreateTodoAccessLink]: "Utwórz link dostępu",
  [TranslationKeys.Copied]: "Skopiowano",
  [TranslationKeys.AnonymousUser]:
    "Anonimowy użytkownik, który użył linku dostępu",
  [TranslationKeys.VIEWER]: "Przeglądający",
  [TranslationKeys.VIEWERDESCRIPTION]:
    "Wszyscy z linkiem mogą przeglądać tę listę i wszystkie zadania utworzone przez jej członków i administratorów, ale nie mogą niczego tworzyć, edytować i usuwać.",
  [TranslationKeys.MEMBER]: "Członek",
  [TranslationKeys.MEMBERDESCRIPTION]:
    "Członek z linkiem może przeglądać tę listę i wszystkie jej zadania, może tworzyć nowe zadania, ale nie może niczego edytować i usuwać.",
  [TranslationKeys.ADMIN]: "Administrator",
  [TranslationKeys.ADMINDESCRIPTION]:
    "Administratorzy mają pełny dostęp do tej listy. Mogą tworzyć, edytować i usuwać wszystkie zadania oraz zapraszać innych użytkowników. Uważaj, kogo zapraszasz jako administratora.",

  [TranslationKeys.Tasks]: "Zadania",
  [TranslationKeys.EmptyTasksList]: "Brak zadań na liście. Dodaj nowe zadanie!",
  [TranslationKeys.DelteTask]: "Usuń zadanie",
  [TranslationKeys.AddTask]: "Dodaj zadanie",
  [TranslationKeys.EditTask]: "Edytuj zadanie",
  [TranslationKeys.TaskName]: "Nazwa zadania",
  [TranslationKeys.Link]: "Link",
  [TranslationKeys.NotifyMe]: "Powiadom mnie",
  [TranslationKeys.DelteTaskWarning]:
    "Czy na pewno chcesz usunąć to zadanie? Ta operacja jest nieodwracalna.",
  [TranslationKeys.TaskMarkedAsFinishedWithDate]:
    "Zadanie zostało zapisane jako zakończone z datą:",
  [TranslationKeys.TaskIsOnFinishedList]:
    "Jest ono widoczne na liście zadań zakończonych.",
  [TranslationKeys.StartDate]: "Planowana data rozpoczęcia",
  [TranslationKeys.FinishDate]: "Planowana data zakończenia",
  [TranslationKeys.CompletionDate]: "Data ukończenia",
  [TranslationKeys.Creator]: "Twórca",
  [TranslationKeys.Days]: "dni",
  [TranslationKeys.Hours]: "godzin",
  [TranslationKeys.Ago]: "temu",
  [TranslationKeys.Before]: "Przed datą",
  [TranslationKeys.After]: "Po dacie",
  [TranslationKeys.Finish]: "Końca",
  [TranslationKeys.Start]: "Startu",
  [TranslationKeys.NoDate]:
    "Nie wybrano daty rozpoczęcia ani zakończenia. Ustaw je w zakładce 'Data'",

  [TranslationKeys.Reccurance]: "Powtarzalność",
  [TranslationKeys.First]: "Pierwszy/a",
  [TranslationKeys.Second]: "Drugi/a",
  [TranslationKeys.Third]: "Trzeci/a",
  [TranslationKeys.Fourth]: "Czwarty/a",
  [TranslationKeys.Last]: "Ostatni/a",
  [TranslationKeys.Sunday]: "Niedziela",
  [TranslationKeys.Monday]: "Poniedziałek",
  [TranslationKeys.Tuesday]: "Wtorek",
  [TranslationKeys.Wednesday]: "Środa",
  [TranslationKeys.Thursday]: "Czwartek",
  [TranslationKeys.Friday]: "Piątek",
  [TranslationKeys.Saturday]: "Sobota",
  [TranslationKeys.WeekendDays]: "Weekend",
  [TranslationKeys.Weekdays]: "Dni robocze",
  [TranslationKeys.January]: "Stycznia",
  [TranslationKeys.February]: "Lutego",
  [TranslationKeys.March]: "Marca",
  [TranslationKeys.April]: "Kwietnia",
  [TranslationKeys.May]: "Maja",
  [TranslationKeys.June]: "Czerwca",
  [TranslationKeys.July]: "Lipca",
  [TranslationKeys.August]: "Sierpnia",
  [TranslationKeys.September]: "Września",
  [TranslationKeys.October]: "Października",
  [TranslationKeys.November]: "Listopada",
  [TranslationKeys.December]: "Grudnia",
  [TranslationKeys.Daily]: "Codziennie",
  [TranslationKeys.Weekly]: "Co tydzień",
  [TranslationKeys.Monthly]: "Co miesiąc",
  [TranslationKeys.Yearly]: "Co rok",
  [TranslationKeys.DayOfTheMonth]: "Dzień miesiąca",
  [TranslationKeys.WeekDay]: "Dzień tygodnia",
  [TranslationKeys.WeekDayOfMonths]: "Dzień tygodnia w miesiącu",
  [TranslationKeys.Every]: "Co",
  [TranslationKeys.Weeks]: "Tygodnie",
  [TranslationKeys.Months]: "Miesiące",
  [TranslationKeys.Years]: "Lata",
  [TranslationKeys.On]: "dnia",
  [TranslationKeys.OnThe]: "w",
  [TranslationKeys.Of]: " ",
  [TranslationKeys.EndType]: "Typ zakończenia",
  [TranslationKeys.EndByDate]: "Zakończ po dacie",
  [TranslationKeys.EndAfter]: "Zakończ po",
  [TranslationKeys.EndNever]: "Nigdy",
  [TranslationKeys.AfterOccurances]: "po wystąpieniach",

  [TranslationKeys.Notifications]: "Powiadomienia",
  [TranslationKeys.ArchivedNotifications]: "Archiwalne powiadomienia",
  [TranslationKeys.ArchiveAll]: "Archiwizuj wszystkie",
  [TranslationKeys.UnarchiveAll]: "Przywróć wszystkie",
  [TranslationKeys.DeleteAllArchived]: "Usuń wszystkie archiwalne",
  [TranslationKeys.EmptyNotificationsList]: "Brak nowych powiadomień",
  [TranslationKeys.EmptyArchivedNotificationsList]:
    "Archiwum notyfikacji jest puste",

  // Notifications messages
  [TranslationKeys.NotificationByUserPart]: ", przez użytkownika ",
  [TranslationKeys.NotificationInTodoListPart]: ", w liście zadań ",
  [TranslationKeys.NotificationNewTodoListPart]: "Nowa lista zadań ",
  [TranslationKeys.NotificationExistingTodoListPart]: "Lista zadań ",
  [TranslationKeys.NotificationNewTaskPart]: "Nowe zadanie ",
  [TranslationKeys.NotificationExistingTaskPart]: "Zadanie ",
  [TranslationKeys.NotificationWasCreatedPart]: "zostało utworzone ",
  [TranslationKeys.NotificationWasModifiedPart]: "zostało zmodyfikowane ",
  [TranslationKeys.NotificationWasDeletedPart]: "zostało usunięte ",
  [TranslationKeys.NotificationUnknownAction]: "Nieznana akcja ",
  [TranslationKeys.NotificationNewReminderPart]: "Nowe przypomnienie ",
  [TranslationKeys.NotificationExistingReminderPart]: "Przypomnienie ",
  [TranslationKeys.NotificationUserInvitedPart]:
    "Zostałeś zaproszony do listy zadań ",
  [TranslationKeys.NotificationUserRemovedPart]:
    "Zostałeś usunięty z listy zadań ",
  [TranslationKeys.UserSendYouCollaborationRequest]:
    "wysłał/a Ci zaproszenie do współpracy.",
  [TranslationKeys.UserAcceptedYourCollaborationRequest]:
    "zaakceptował/a Twoje zaproszenie do współpracy.",
  [TranslationKeys.UserRejectedYourCollaborationRequest]:
    "odrzucił/a Twoje zaproszenie do współpracy.",
  [TranslationKeys.UserSendYouCollaborationSecondRequest]:
    "ponownie wysłał/a Ci zaproszenie do współpracy.",
  [TranslationKeys.UserBlockedCollaborationWithYou]:
    "zablokował/a współpracę z Tobą.",

  [TranslationKeys.PageTitleUserSettings]: "Ustawienia użytkownika",
  [TranslationKeys.ChangePassword]: "Zmień hasło",
  [TranslationKeys.CurrentPasswordLabel]: "aktualne hasło",
  [TranslationKeys.NewPasswordLabel]: "nowe hasło",
  [TranslationKeys.NewPasswordRepeatLabel]: "powtórz nowe hasło",
  [TranslationKeys.PasswordChanged]: "Ustawiono nowe hasło.",
  [TranslationKeys.ChangeDisplayName]: "Zmień nazwę użytkownika",
  [TranslationKeys.ChangeAvatar]: "Zmień zdjęcie profilowe",
  [TranslationKeys.GoogleIntegration]: "Integracja z google",
  [TranslationKeys.AvatarChanged]: "Zdjęcie zapisane",
  [TranslationKeys.DispalyNameChanged]: "Zmieniono nazwę użytkownika.",
  [TranslationKeys.Logout]: "Wyloguj",
  [TranslationKeys.Theme]: "Motyw",
  [TranslationKeys.LanguagePolish]: "Język Polski",
  [TranslationKeys.LanguageEnglish]: "Język Angielski",
  [TranslationKeys.NotificationsSettings]: "Preferencje powiadomień",
  [TranslationKeys.TASK_CREATED]:
    "Zadanie zostało utworzone w liście zadań do której jesteś przypisany/a",
  [TranslationKeys.TASK_UPDATED]:
    "Zadanie zostało zmodyfikowane w liście zadań do której jesteś przypisany/a",
  [TranslationKeys.TASK_RESCHEDULED]:
    "Data zadania została zmieniona w liście zadań do której jesteś przypisany/a",
  [TranslationKeys.TASK_STATE_CHANGED]:
    "Status zadania został zmieniony w liście zadań do której jesteś przypisany/a",
  [TranslationKeys.TASK_DELETED]:
    "Zadanie zostało usunięte z listy zadań do której jesteś przypisany/a",
  [TranslationKeys.REMINDER_CREATED]:
    "Zostałeś przypisany/a do nowego przypomnienia",
  [TranslationKeys.REMINDER_UPDATED]:
    "Przypomnienie do którego jesteś przypisany/a zostało zmodyfikowane",
  [TranslationKeys.REMINDER_DELETED]:
    "Przypomnienie do którego jesteś przypisany/a zostało usunięte",
  [TranslationKeys.COLLABOARTION_ACCEPTED]:
    "Prośba o współpracę którą wysłałeś/aś została zaakceptowana",
  [TranslationKeys.COLLABOARTION_REQUESTED]:
    "Otrzymałeś/aś zaproszenie do współpracy",
  [TranslationKeys.COLLABOARTION_RE_OPENED]:
    "Otrzymałeś/aś zaproszenie do współpracy po raz drugi",
  [TranslationKeys.COLLABOARTION_REJECTED]:
    "Prośba o współpracę którą wysłałeś/aś została odrzucona",
  [TranslationKeys.COLLABOARTION_BLOCKED]:
    "Współpraca z Tobą została zablokowana",
  [TranslationKeys.TODOLIST_CREATED]:
    "Zostałeś przypisany/a do nowej listy zadań",
  [TranslationKeys.TODOLIST_UPDATED]:
    "Lista zadań do której jesteś przypisany/a została zmodyfikowana",
  [TranslationKeys.TODOLIST_DELETED]:
    "Lista zadań do której jesteś przypisany/a została usunięta",
  [TranslationKeys.TODOLIST_MEMBER_ADDED]:
    "Użytkownik został dodany do listy zadań do której jesteś przypisany/a",
  [TranslationKeys.TODOLIST_MEMBER_REMOVED]:
    "Użytkownik został usunięty z listy zadań do której jesteś przypisany/a",
  [TranslationKeys.SCHEDULE_TASK_NOTIFICATION]:
    "Zaplanowano zadanie do wykonania",
  [TranslationKeys.SCHEDULE_REMINDER_NOTIFICATION]:
    "Zaplanowano przypomnienie do wykonania",
  [TranslationKeys.PushNotification]: "Powiadomienia push",
  [TranslationKeys.SocketNotification]: "Powiadomienia w czasie rzeczywistym",
  [TranslationKeys.EmailNotification]: "Email",
  [TranslationKeys.RegisterPushSubscription]: "Zarejestruj urządzenie",
  [TranslationKeys.RegisterPushSubscriptionDescription]:
    "Nie zarejestrowałeś/aś jeszcze urządzenia do otrzymywania powiadomień push lub Twoja subskrybcja wygasła. Aby być na bieżąco z aktualizacjami list zadań, przypomnień, współpracowników i zadań, zarejestruj swoje urządzenie.",
  [TranslationKeys.DisableBackgroundAnimation]: "Wyłącz animacje tła",

  [TranslationKeys.Save]: "Zapisz",
  [TranslationKeys.Cancel]: "Anuluj",
  [TranslationKeys.Details]: "Szczegóły",
  [TranslationKeys.Description]: "Opis",
  [TranslationKeys.LinkValidation]:
    "Link musi zaczynać się od http:// lub https://",
};
