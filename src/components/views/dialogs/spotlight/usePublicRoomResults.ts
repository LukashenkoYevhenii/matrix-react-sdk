/*
Copyright 2022 The Matrix.org Foundation C.I.C.

Licensed under the Apache License, Version 2.0 (the "License");
you may not use this file except in compliance with the License.
You may obtain a copy of the License at

    http://www.apache.org/licenses/LICENSE-2.0

Unless required by applicable law or agreed to in writing, software
distributed under the License is distributed on an "AS IS" BASIS,
WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
See the License for the specific language governing permissions and
limitations under the License.
*/

import { useCallback, useEffect, useMemo } from "react";

import { usePublicRoomDirectory } from "../../../../hooks/usePublicRoomDirectory";
import { IPublicRoomDirectoryConfig } from "../../directory/NewNetworkDropdown";

export const usePublicRoomResults = (enabled: boolean, query: string, limit = 20) => {
    const {
        ready,
        loading,
        publicRooms,
        search,
        protocols,
        roomServer,
        instanceId,
        setConfig: setConfigInternal,
    } = usePublicRoomDirectory();

    useEffect(() => {
        if (enabled && ready) {
            search({ limit, query });
        }
    }, [enabled, limit, query, ready, search]);

    const config: IPublicRoomDirectoryConfig = useMemo(
        () => ({ server: roomServer, instanceId }),
        [instanceId, roomServer],
    );
    const setConfig = useCallback(
        (config: IPublicRoomDirectoryConfig) => config.server && setConfigInternal(config.server, config.instanceId),
        [setConfigInternal],
    );

    return { loading, results: publicRooms, protocols, config, setConfig } as const;
};
