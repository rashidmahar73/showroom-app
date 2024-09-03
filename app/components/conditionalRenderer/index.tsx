type CRTypes = {
  condition: boolean;
  children: React.ReactNode;
};

function ConditionalRenderer({ condition, children }: CRTypes) {
  return condition ? children : null;
}

export { ConditionalRenderer };
