import { useSSO } from '@clerk/expo';
import * as WebBrowser from 'expo-web-browser';
import { useState } from 'react';
import { Alert } from 'react-native';

WebBrowser.maybeCompleteAuthSession();

const useSocialAuth = () => {

    const [loadingStrategy, setLoadingStrategy] = useState<string | null>(null)
    const { startSSOFlow } = useSSO()

    const handleSocialAuth = async (strategy: "oauth_google" | "oauth_linkedin" | "oauth_github") => {
        if (loadingStrategy) return

        setLoadingStrategy(strategy)
        try {
            const { createdSessionId, setActive } = await startSSOFlow({ strategy })
            if (!createdSessionId || !setActive) {
                const provider = strategy === "oauth_google" ? "Google" : strategy === "oauth_linkedin" ? "LinkedIn" : "Github"
                Alert.alert("Sign in failed", `Failed to create session with ${provider}`)

                return
            }
            await setActive({ session: createdSessionId })
        } catch (error) {
            console.log(error)
            const provider = strategy === "oauth_google" ? "Google" : strategy === "oauth_linkedin" ? "LinkedIn" : "Github"
            Alert.alert("Sign in failed", `Failed to create session with ${provider}`)
        } finally {
            setLoadingStrategy(null)
        }
    }

    return {
        handleSocialAuth,
        loadingStrategy,
        setLoadingStrategy
    }

}

export default useSocialAuth