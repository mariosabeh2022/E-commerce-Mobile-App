export type customInputProps = {
  placeholder: string;
  autoCapitalize?: 'none' | 'sentences' | 'words' | 'characters';
  secureEntry?: boolean;
  value: string;
  onChangeText?: (text: string) => void;
  keyboardType?: 'default' | 'email-address' | 'numeric';
  editable?: boolean;
  multiline?: boolean;
};
