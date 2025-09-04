import {
  IBMPlexSans_400Regular,
  IBMPlexSans_500Medium,
  IBMPlexSans_600SemiBold,
  IBMPlexSans_700Bold,
  useFonts as useIBMFont,
} from '@expo-google-fonts/ibm-plex-sans';
import {
  Inter_500Medium,
  Inter_600SemiBold,
  useFonts as useInterFont,
} from '@expo-google-fonts/inter';
import {
  Montserrat_500Medium,
  Montserrat_600SemiBold,
  Montserrat_700Bold,
  Montserrat_800ExtraBold,
  useFonts as useMontserratFont,
} from '@expo-google-fonts/montserrat';

export function useAppFonts(): boolean {
  const [interFontsLoaded] = useInterFont({
    Inter_500Medium,
    Inter_600SemiBold,
  });

  const [ibmFontsLoaded] = useIBMFont({
    IBMPlexSans_400Regular,
    IBMPlexSans_500Medium,
    IBMPlexSans_600SemiBold,
    IBMPlexSans_700Bold,
  });

  const [montserratLoaded] = useMontserratFont({
    Montserrat_500Medium,
    Montserrat_600SemiBold,
    Montserrat_700Bold,
    Montserrat_800ExtraBold,
  });

  return interFontsLoaded && ibmFontsLoaded && montserratLoaded;
}

export enum Font {
  Inter_400Regular = 'Inter_400Regular',
  Inter_500Medium = 'Inter_500Medium',
  Inter_600SemiBold = 'Inter_600SemiBold',
  Inter_700Bold = 'Inter_700Bold',
  IBMPlexSans_400Regular = 'IBMPlexSans_400Regular',
  IBMPlexSans_500Medium = 'IBMPlexSans_500Medium',
  IBMPlexSans_600SemiBold = 'IBMPlexSans_600SemiBold',
  IBMPlexSans_700Bold = 'IBMPlexSans_700Bold',
  Montserrat_500Medium = 'Montserrat_500Medium',
  Montserrat_600SemiBold = 'Montserrat_600SemiBold',
  Montserrat_700Bold = 'Montserrat_700Bold',
  Montserrat_800ExtraBold = 'Montserrat_800ExtraBold',
}

export enum TextSize {
  xs = 'text-xs',
  sm = 'text-sm',
  base = 'text-base',
  lg = 'text-lg',
  xl = 'text-xl',
  '2xl' = 'text-2xl',
  '3xl' = 'text-3xl',
  '4xl' = 'text-4xl',
  '5xl' = 'text-5xl',
}

export enum TextAlign {
  auto = 'auto',
  left = 'left',
  right = 'right',
  center = 'center',
  justify = 'justify',
}
