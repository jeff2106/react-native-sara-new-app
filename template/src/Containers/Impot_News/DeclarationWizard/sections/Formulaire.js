import React, { useEffect, useState } from 'react'
import { View, useWindowDimensions, Text } from 'react-native'
import { tailwind } from '@/tailwind'
import { ErrorView, KeyboardAView } from '@/Components'
import { useSelector } from 'react-redux'
import SelectionImpotPlaceholder from '@/Containers/Impot/sections/SelectionImpotPlaceholder'
import DynamicForm from '@/Components/DynamicForm'

const Formulaire = ({ fetchData, fields, onFieldChange, control }) => {
  const { width } = useWindowDimensions()

  const fetchFormDeclarationLoading = useSelector(
    state => state.impot.fetchFormDeclaration.loading,
  )
  const fetchFormDeclarationError = useSelector(
    state => state.impot.fetchFormDeclaration.error,
  )

  const [champs, setChamps] = useState([])

  useEffect(() => {
    // console.debug(fields)
    setChamps(fields)
  }, [fields])

  return (
    <View style={[tailwind('flex-1 p-4 w-full'), { width }]}>
      <KeyboardAView>
        {fetchFormDeclarationLoading && <SelectionImpotPlaceholder />}
        {!fetchFormDeclarationLoading && fetchFormDeclarationError && (
          <ErrorView
            errorMessage="Erreur lors de la récupération du formulaire, veuillez réessayer"
            onRetryPress={fetchData}
          />
        )}

        {!fetchFormDeclarationLoading &&
          !fetchFormDeclarationError &&
          champs.length <= 0 && (
            <ErrorView
              showImage={false}
              errorMessage="Le formulaire ne contient aucune donnée."
              onRetryPress={fetchData}
            />
          )}
        {!fetchFormDeclarationLoading &&
          !fetchFormDeclarationError &&
          champs.length > 0 && (
            <DynamicForm onDataChange={onFieldChange} fields={fields} />
          )}
        <View style={tailwind('mb-10')}>{control}</View>
      </KeyboardAView>
    </View>
  )
}

Formulaire.propTypes = {}

Formulaire.defaultProps = {}

export default Formulaire
