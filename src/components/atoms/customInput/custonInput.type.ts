export type customInputProps = {
  placeholder: string;
  placeholderColor: string;
  autoCapitalize?: 'none' | 'sentences' | 'words' | 'characters';
  secureEntry?: boolean;
  value: string;
  onChangeText: () => void;
  keyboardType?: 'default' | 'email-address' | 'numeric';
};
