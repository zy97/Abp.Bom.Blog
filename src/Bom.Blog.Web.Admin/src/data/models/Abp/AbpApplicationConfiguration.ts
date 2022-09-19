export interface ApplicationAuthConfigurationDto {
    policies: Record<string, boolean>;
    grantedPolicies: Record<string, boolean>;
}
export interface ApplicationConfigurationDto {
    localization: ApplicationLocalizationConfigurationDto;
    auth: ApplicationAuthConfigurationDto;
    setting: ApplicationSettingConfigurationDto;
    currentUser: CurrentUserDto;
    features: ApplicationFeatureConfigurationDto;
    globalFeatures: ApplicationGlobalFeatureConfigurationDto;
    multiTenancy: MultiTenancyInfoDto;
    currentTenant: CurrentTenantDto;
    timing: TimingDto;
    clock: ClockDto;
    objectExtensions: ObjectExtensionsDto;
}
export interface ApplicationFeatureConfigurationDto {
    values: Record<string, string>;
}
export interface ApplicationGlobalFeatureConfigurationDto {
    enabledFeatures: string[];
}
export interface ApplicationLocalizationConfigurationDto {
    values: Record<string, Record<string, string>>;
    languages: LanguageInfo[];
    currentCulture: CurrentCultureDto;
    defaultResourceName?: string;
    languagesMap: Record<string, NameValue[]>;
    languageFilesMap: Record<string, NameValue[]>;
}
export interface ApplicationSettingConfigurationDto {
    values: Record<string, string>;
}
export interface ClockDto {
    kind?: string;
}
export interface CurrentCultureDto {
    displayName?: string;
    englishName?: string;
    threeLetterIsoLanguageName?: string;
    twoLetterIsoLanguageName?: string;
    isRightToLeft: boolean;
    cultureName?: string;
    name?: string;
    nativeName?: string;
    dateTimeFormat: DateTimeFormatDto;
}
export interface CurrentUserDto {
    isAuthenticated: boolean;
    id?: string;
    tenantId?: string;
    impersonatorUserId?: string;
    impersonatorTenantId?: string;
    impersonatorUserName?: string;
    impersonatorTenantName?: string;
    userName?: string;
    name?: string;
    surName?: string;
    email?: string;
    emailVerified: boolean;
    phoneNumber?: string;
    phoneNumberVerified: boolean;
    roles: string[];
}
export interface DateTimeFormatDto {
    calendarAlgorithmType?: string;
    dateTimeFormatLong?: string;
    shortDatePattern?: string;
    fullDateTimePattern?: string;
    dateSeparator?: string;
    shortTimePattern?: string;
    longTimePattern?: string;
}

export interface IanaTimeZone {
    timeZoneName?: string;
}

export interface TimeZone {
    iana: IanaTimeZone;
    windows: WindowsTimeZone;
}

export interface TimingDto {
    timeZone: TimeZone;
}

export interface WindowsTimeZone {
    timeZoneId?: string;
}
export interface LanguageInfo {
    cultureName?: string;
    uiCultureName?: string;
    displayName?: string;
    flagIcon?: string;
}
export interface NameValue<T = string> {
    name?: string;
    value: T;
}
export interface MultiTenancyInfoDto {
    isEnabled: boolean;
}
export interface CurrentTenantDto {
    id?: string;
    name?: string;
    isAvailable: boolean;
}
export interface EntityExtensionDto {
    properties: Record<string, ExtensionPropertyDto>;
    configuration: Record<string, object>;
}

export interface ExtensionEnumDto {
    fields: ExtensionEnumFieldDto[];
    localizationResource?: string;
}

export interface ExtensionEnumFieldDto {
    name?: string;
    value: object;
}

export interface ExtensionPropertyApiCreateDto {
    isAvailable: boolean;
}

export interface ExtensionPropertyApiDto {
    onGet: ExtensionPropertyApiGetDto;
    onCreate: ExtensionPropertyApiCreateDto;
    onUpdate: ExtensionPropertyApiUpdateDto;
}

export interface ExtensionPropertyApiGetDto {
    isAvailable: boolean;
}

export interface ExtensionPropertyApiUpdateDto {
    isAvailable: boolean;
}

export interface ExtensionPropertyAttributeDto {
    typeSimple?: string;
    config: Record<string, object>;
}

export interface ExtensionPropertyDto {
    type?: string;
    typeSimple?: string;
    displayName: LocalizableStringDto;
    api: ExtensionPropertyApiDto;
    ui: ExtensionPropertyUiDto;
    attributes: ExtensionPropertyAttributeDto[];
    configuration: Record<string, object>;
    defaultValue: object;
}

export interface ExtensionPropertyUiDto {
    onTable: ExtensionPropertyUiTableDto;
    onCreateForm: ExtensionPropertyUiFormDto;
    onEditForm: ExtensionPropertyUiFormDto;
    lookup: ExtensionPropertyUiLookupDto;
}

export interface ExtensionPropertyUiFormDto {
    isVisible: boolean;
}

export interface ExtensionPropertyUiLookupDto {
    url?: string;
    resultListPropertyName?: string;
    displayPropertyName?: string;
    valuePropertyName?: string;
    filterParamName?: string;
}

export interface ExtensionPropertyUiTableDto {
    isVisible: boolean;
}

export interface LocalizableStringDto {
    name?: string;
    resource?: string;
}

export interface ModuleExtensionDto {
    entities: Record<string, EntityExtensionDto>;
    configuration: Record<string, object>;
}

export interface ObjectExtensionsDto {
    modules: Record<string, ModuleExtensionDto>;
    enums: Record<string, ExtensionEnumDto>;
}