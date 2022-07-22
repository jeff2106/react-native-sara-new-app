import React from 'react'
import { createStackNavigator } from '@react-navigation/stack'
import {
  ForgotPasswordScreen,
  LoginRegisterScreen,
  LoginScreen,
  OTPValidationScreen,
  RegistrationAdministrationScreen,
  RegistrationEnterpriseScreen,
  RegistrationInfosScreen,
  RegistrationTypeScreen,
  RegistrationUserScreen,
  RegistrationExpertComptableScreen,
  RegistrationEntrepriseFormDownloadScreen,
  RegistrationCGAScreen,
  RegistrationEntrepriseDoneScreen,
  RegistrationCGAFormDownloadScreen,
  RegistrationCGADoneScreen,
  RegistrationExpertComptableFormDownloadScreen,
  RegistrationExpertComptableDoneScreen,
} from '@/Containers'

const AuthStack = createStackNavigator()

const AuthNavigator = () => {
  return (
    <AuthStack.Navigator headerMode={'none'} initialRouteName="LoginRegister">
      <AuthStack.Screen name="LoginRegister" component={LoginRegisterScreen} />
      <AuthStack.Screen
        name="RegistrationType"
        component={RegistrationTypeScreen}
      />
      <AuthStack.Screen
        name="RegistrationInfos"
        component={RegistrationInfosScreen}
      />
      <AuthStack.Screen
        name="RegistrationUser"
        component={RegistrationUserScreen}
      />
      <AuthStack.Screen
        name="RegistrationEnterprise"
        component={RegistrationEnterpriseScreen}
      />
      <AuthStack.Screen
        name="RegistrationEntrepriseFormDownload"
        component={RegistrationEntrepriseFormDownloadScreen}
      />
      <AuthStack.Screen
        name="RegistrationEntrepriseDone"
        component={RegistrationEntrepriseDoneScreen}
      />
      <AuthStack.Screen
        name="RegistrationAdministration"
        component={RegistrationAdministrationScreen}
      />
      <AuthStack.Screen
        name="RegistrationCGA"
        component={RegistrationCGAScreen}
      />
      <AuthStack.Screen
        name="RegistrationCGAFormDownload"
        component={RegistrationCGAFormDownloadScreen}
      />
      <AuthStack.Screen
        name="RegistrationCGADone"
        component={RegistrationCGADoneScreen}
      />
      <AuthStack.Screen
        name="RegistrationExpertComptable"
        component={RegistrationExpertComptableScreen}
      />
      <AuthStack.Screen
        name="RegistrationExpertComptableFormDownload"
        component={RegistrationExpertComptableFormDownloadScreen}
      />
      <AuthStack.Screen
        name="RegistrationExpertComptableDone"
        component={RegistrationExpertComptableDoneScreen}
      />
      <AuthStack.Screen name="OTPValidation" component={OTPValidationScreen} />
      <AuthStack.Screen name="Login" component={LoginScreen} />
      <AuthStack.Screen
        name="ForgotPassword"
        component={ForgotPasswordScreen}
      />
    </AuthStack.Navigator>
  )
}

export default AuthNavigator
