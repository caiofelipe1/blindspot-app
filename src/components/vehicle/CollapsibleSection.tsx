import { useState } from 'react';
import { View, Text, Pressable } from 'react-native';
import { ChevronDown, ChevronUp } from 'lucide-react-native';
import type { ReactNode } from 'react';
import { colors } from '@/src/styles/tokens';

interface CollapsibleSectionProps {
  title: string;
  icon: ReactNode;
  children: ReactNode;
  defaultExpanded?: boolean;
}

export function CollapsibleSection({
  title,
  icon,
  children,
  defaultExpanded = false,
}: CollapsibleSectionProps) {
  const [expanded, setExpanded] = useState(defaultExpanded);

  return (
    <View
      style={{
        backgroundColor: colors.white,
        borderRadius: 16,
        overflow: 'hidden',
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 1 },
        shadowOpacity: 0.06,
        shadowRadius: 4,
        elevation: 2,
      }}
    >
      <Pressable
        onPress={() => setExpanded(e => !e)}
        style={{
          flexDirection: 'row',
          alignItems: 'center',
          paddingHorizontal: 20,
          paddingVertical: 16,
          gap: 12,
        }}
      >
        <View
          style={{
            width: 36,
            height: 36,
            borderRadius: 10,
            backgroundColor: 'rgba(0,119,200,0.08)',
            alignItems: 'center',
            justifyContent: 'center',
          }}
        >
          {icon}
        </View>

        <Text
          style={{ flex: 1, fontSize: 16, fontWeight: '600', color: colors.normal, letterSpacing: 0.2 }}
        >
          {title}
        </Text>

        {expanded ? (
          <ChevronUp size={20} color={colors.subtleDark} strokeWidth={1.5} />
        ) : (
          <ChevronDown size={20} color={colors.subtleDark} strokeWidth={1.5} />
        )}
      </Pressable>

      {expanded && (
        <View style={{ paddingHorizontal: 20, paddingBottom: 4 }}>
          {children}
        </View>
      )}
    </View>
  );
}
