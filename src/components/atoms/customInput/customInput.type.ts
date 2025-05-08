export type customInputProps = {
  placeholder: string;
  autoCapitalize?: 'none' | 'sentences' | 'words' | 'characters';
  secureEntry?: boolean;
  value: string;
  onChangeText: () => void;
  keyboardType?: 'default' | 'email-address' | 'numeric';
};
