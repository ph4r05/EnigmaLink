"use strict";
var defaults = {
    site: 'site1.enigmabridge.com',
    site1: 'site1.enigmabridge.com',
    site2: 'site2.enigmabridge.com'
};

// configuration
var shareConfig = {
    baseUrl: 'https://umph.io',
    downloadHandler: '/d',
    shareFolderName: 'EnigmaShares',
    clientId: '1044449456843-q4lt3nk61gulb67irbr45jvcr2siqfks.apps.googleusercontent.com',
    defaultShareSettings: {
        maskFile: true,
        sizeConceal: true,
        pngWrap: true
    },
    ebConfigUploadLegacy: {
        apiKey:       'API_TEST',
        remoteEndpoint:'site2.enigmabridge.com',
        userObjectId: 'EE01',
        method:       'PLAINAES',
        encKey:       'e134567890123456789012345678901234567890123456789012345678901234',
        macKey:       'e224262820223456789012345678901234567890123456789012345678901234',
        comKey:       undefined
    },
    ebConfigDownloadLegacy: {
        apiKey:       'API_TEST',
        remoteEndpoint:'site2.enigmabridge.com',
        userObjectId: 'EE02',
        method:       'PLAINAES',
        encKey:       'e134567890123456789012345678901234567890123456789012345678901234',
        macKey:       'e224262820223456789012345678901234567890123456789012345678901234',
        comKey:       undefined
    },
    ebConfigUploadUmphOld: {
        apiKey:       'API_TEST',
        uotype:       0x4,
        remoteEndpoint:'site1.enigmabridge.com',
        userObjectId: '7b',
        method:       'PLAINAES',
        encKey:       'f489e056b04f8af72c959326933ccb15a0bf2aaac18d59d8a8d3c07cf45f18ec',
        macKey:       'aedcd9c1f0f2737fbd7da5242868a5bdb2a3afbab14000e03772e4d7da1f10d6',
        comKey:       '4b27a1db039f0c8566d307ef03dde031'
    },
    ebConfigDownloadUmphOld: {
        apiKey:       'API_TEST',
        uotype:       0xf,
        remoteEndpoint:'site1.enigmabridge.com',
        userObjectId: '79',
        method:       'PLAINAESDECRYPT',
        encKey:       '1c71e939a348938c61eee1d12769f23c7e2a93e689f0cc065a916f9af29e73dd',
        macKey:       '710b8ff6b9ac669cd437cb32d442c394206922dcab2dd8b6c52715dd0fac72c6',
        comKey:       'e69cd6dd17447ecb676325aa2baf513e'
    },
    ebConfigUpload: {
        apiKey:       'API_TEST',
        uotype:       0x4,
        remoteEndpoint:'site1.enigmabridge.com',
        userObjectId: '7d',
        method:       'PLAINAES',
        encKey:       '6d8cd10dea702ba590aa580d711ff36d30e3d33d5d4173f29f2507a002c09857',
        macKey:       'f724d2afdbd8c861dc90baa18301e8df47eccada838a3d8b1bc0cf647a4d7213',
        comKey:       '3062fd96f932e47578455dd682da532f'
    },
    ebConfigDownload: {
        apiKey:       'API_TEST',
        uotype:       0xf,
        remoteEndpoint:'site1.enigmabridge.com',
        userObjectId: '7f',
        method:       'PLAINAESDECRYPT',
        encKey:       '06fdfbfe8649517ee963107a5395b954437d87c010596d73902320542e50569c',
        macKey:       '4d87d90a69e9459951272f88662924d9adf311d683530bca408764959a1fb765',
        comKey:       '156872c8734e32e17d4e48557bc0486c'
    }
};

shareConfig.sharedFolderQuery = {
        'q': "mimeType='application/vnd.google-apps.folder'" +
        " and name='" + shareConfig.shareFolderName + "' " +
        " and trashed=false " +
        " and 'root' in parents",
        'fields': "nextPageToken, files(id, name)"
};

shareConfig.shareFolderCreate = {
    resource: {
        'name' : shareConfig.shareFolderName,
        'mimeType' : 'application/vnd.google-apps.folder'
    },
    fields: 'id'
};

function getProxyRedirLink(fileId){
    //return sprintf("http://deadcode.me/proxy-redir.php?id=%s", encodeURIComponent(fileId));
    //return sprintf("https://expert.enigmabridge.com/cgi-bin/proxy-redir.php?id=%s", encodeURIComponent(fileId));
    return sprintf("https://umph.io/proxy-redir.php?id=%s", encodeURIComponent(fileId));
}

// Embedding PNG image.
var pngImg = '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';

