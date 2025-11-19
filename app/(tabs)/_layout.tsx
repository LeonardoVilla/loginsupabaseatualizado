import { Tabs } from 'expo-router';
import React, { useEffect, useState } from 'react'; // <-- Linha nova: adicionamos useEffect e useState
import { ActivityIndicator, View } from 'react-native'; // <-- Linha nova: para mostrar loading

import { HapticTab } from '@/components/haptic-tab';
import { IconSymbol } from '@/components/ui/icon-symbol';
import { Colors } from '@/constants/theme';
import { useColorScheme } from '@/hooks/use-color-scheme';
import { supabase } from '@/lib/supabase'; // <-- Linha nova: import Supabase
import { router } from 'expo-router'; // <-- Linha nova: import router para redirecionamento

export default function TabLayout() {
  const colorScheme = useColorScheme();
  const [loading, setLoading] = useState(true); // <-- Linha nova: estado para controlar loading

  useEffect(() => {
    // <-- Linha nova: checa a sessão ao montar o layout
    supabase.auth.getSession().then(({ data: { session } }) => {
      if (!session) {
        router.replace('/(public)'); // <-- Linha nova: redireciona se não estiver logado
      } else {
        setLoading(false); // <-- Linha nova: sessão válida → libera Tabs
      }
    });

    // <-- Linha nova: listener de logout / mudanças de sessão
    const { data: listener } = supabase.auth.onAuthStateChange((_event, session) => {
      if (!session) {
        router.replace('/(public)'); // <-- Linha nova: redireciona se o usuário deslogar
      }
    });

    return () => listener.subscription.unsubscribe(); // <-- Linha nova: limpa listener ao desmontar
  }, []);

  // <-- Linha nova: exibe loading enquanto verifica a sessão
  if (loading) {
    return (
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        <ActivityIndicator size="large" />
      </View>
    );
  }

  // Layout original de Tabs
  return (
    <Tabs
      screenOptions={{
        tabBarActiveTintColor: Colors[colorScheme ?? 'light'].tint,
        headerShown: false,
        tabBarButton: HapticTab,
      }}>
      <Tabs.Screen
        name="index"
        options={{
          title: 'Home',
          tabBarIcon: ({ color }) => <IconSymbol size={28} name="house.fill" color={color} />,
        }}
      />
      <Tabs.Screen
        name="explore"
        options={{
          title: 'Explore',
          tabBarIcon: ({ color }) => <IconSymbol size={28} name="paperplane.fill" color={color} />,
        }}
      />
    </Tabs>
  );
}