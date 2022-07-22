# GLOBAL PAY
Global Pay Mobile application

## Generate tailwind style.json file
```
npx create-tailwind-rn
```

## Generate App SMS Hash
```
./sms_retriever_hash_v9.sh --package "com.global_pay" --keystore ./android/app/prod.keystore
```

## Build APK RELEASE
### Step 1
```
react-native bundle --platform android --dev false --entry-file index.js --bundle-output android/app/src/main/assets/index.android.bundle --assets-dest android/app/src/main/res/
```

### Step 2
```
rm -rf android/app/src/main/res/drawable-*
```

### Step 3
```
react-native bundle --platform android --dev false \
  --entry-file index.js \
  --bundle-output android/app/src/main/assets/index.android.bundle \
  --assets-dest android/app/build/intermediates/res/merged/release/
```

### Step 4 : Mode to android folder
```
./gradlew assembleRelease
```


## Build AAB
### 1. Ancienne méthode : Build de l'application
```
./gradlew bundleRelease
./gradlew :app:assembleRelease
```

### 2. Ancienne méthode : Conversion aab vers apks
```
java -jar ./bundletool.jar build-apks --bundle=./app/build/outputs/bundle/release/app-release.aab --output=my_app.apks
```

### 3. Ancienne méthode : Installation sur le téléphone avec adb
```
java -jar "./bundletool.jar" install-apks --apks=my_app.apks
```

