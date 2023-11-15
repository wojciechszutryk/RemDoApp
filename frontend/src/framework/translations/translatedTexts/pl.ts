import { TranslationKeys } from "./translationKeys";

export const plTranslation: Record<TranslationKeys, string> = {
  [TranslationKeys.PageTitleMain]: "TodoList",
  [TranslationKeys.FieldRequired]: "* Wymagane",

  [TranslationKeys.NoAccess]: "Nie posiadasz wymaganych uprawnień.",

  [TranslationKeys.PageTitleHome]: "Główna",
  [TranslationKeys.WelcomeTextHeader]: "TodoList",
  [TranslationKeys.WelcomeTextDescription]:
    "Witamy w naszej aplikacji Todo/Reminder! Dzięki naszej aplikacji możesz z łatwością być na bieżąco z codziennymi zadaniami i nigdy więcej nie zapomnieć o ważnym spotkaniu. Nasz przyjazny dla użytkownika interfejs i konfigurowalne funkcje ułatwiają tworzenie, organizowanie i ustalanie priorytetów list rzeczy do zrobienia i przypomnień. Zacznij już dziś i przejmij kontrolę nad swoim napiętym harmonogramem!",
  [TranslationKeys.LoginPanelSeparatorText]: "lub",
  [TranslationKeys.GoToFeaturesButtonText]: "Poznaj funkcje",
  [TranslationKeys.LoginPanelHeader]: "Zaloguj się lub zarejestruj",
  [TranslationKeys.SignInGoogle]: "Za pomocą google",
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
  [TranslationKeys.PasswordRequired]: "hasło wymagane",
  [TranslationKeys.WrongPassword]: "hasło nieprawidłowe",
  [TranslationKeys.PasswordsNoMatch]: "hasła nie są identyczne",
  [TranslationKeys.LoginSuccess]: "Zalogowano pomyślnie.",
  [TranslationKeys.InvalidCredentials]: "niepoprawne dane, spróbuj ponownie",
  [TranslationKeys.CurrentAccount]: "Twoje konto",

  [TranslationKeys.PageTitleFeatures]: "Funkcje",

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

  [TranslationKeys.EmptyTasksList]: "Brak zadań na liście. Dodaj nowe zadanie!",
  [TranslationKeys.DelteTask]: "Usuń zadanie",
  [TranslationKeys.AddTask]: "Dodaj zadanie",
  [TranslationKeys.EditTask]: "Edytuj zadanie",
  [TranslationKeys.TaskName]: "Nazwa zadania",
  [TranslationKeys.TaskImportant]: "Ważne",
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
  [TranslationKeys.RegisterPushSubscription]: "Zarejestruj urządzenie",
  [TranslationKeys.RegisterPushSubscriptionDescription]:
    "Nie zarejestrowałeś/aś jeszcze urządzenia do otrzymywania powiadomień push. Aby być na bieżąco z aktualizacjami list zadań, przypomnień, współpracowników i zadań, zarejestruj swoje urządzenie.",

  [TranslationKeys.Save]: "Zapisz",
  [TranslationKeys.Cancel]: "Anuluj",
  [TranslationKeys.Details]: "Szczegóły",
};
